'use strict';

const { buildFmpPersons, } = require('./build-fmp-persons');

jest.mock('../build-fmp-date-created');
const { buildFmpDateCreated, } = require('../build-fmp-date-created');

beforeEach(() => {
	jest.clearAllMocks();
	buildFmpDateCreated.mockImplementation(() => 'mock date string');
});

describe('buildFmpPersons', () => {
	const noIndividualsCase = {
		gedcom: {},
		personsIds: {},
		expectedPersons: [],
	};

	const oneIndividualCase = {
		gedcom: {
			INDI: [
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										lineValue: 'Jane',
									},
								},
							],
							SURN: [
								{
									value: {
										lineValue: 'Doe',
									},
								},
							],
						},
					],
					SEX: [
						{
							value: {
								lineValue: 'F',
							},
						},
					],
					BIRT: [
						{
							DATE: [
								{
									value: {
										lineValue: '1 Jan 1990',
									},
								},
							],
						},
					],
					value: {
						xrefId: '@I1@',
					},
				},
			], },
		personsIds: {
			'@I1@': 1000000,
		},
		expectedPersons: [
			{
				Id: 1000000,
				IsLiving: true,
				Gender: 2,
				DateCreated: 'mock date string',
				Names: [
					{
						FactTypeId: 100,
						GivenNames: 'Jane',
						Surnames: 'Doe',
					},
				],
				Facts: [
					{
						DateDetail: '1 Jan 1990',
						FactTypeId: 405,
						Preferred: true,
					},
				],
			},
		],
	};

	const multipleIndividualsCase = {
		gedcom: {
			INDI: [
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										lineValue: 'Jane',
									},
								},
							],
							SURN: [
								{
									value: {
										lineValue: 'Doe',
									},
								},
							],
						},
					],
					SEX: [
						{
							value: {
								lineValue: 'F',
							},
						},
					],
					BIRT: [
						{
							DATE: [
								{
									value: {
										lineValue: '1 Jan 1990',
									},
								},
							],
						},
					],
					value: {
						xrefId: '@I1@',
					},
				},
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										tag: 'GIVN',
										lineValue: 'John',
									},
								},
							],
							SURN: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'SURN',
										lineValue: 'Smith',
									},
								},
							],
						},
					],
					SEX: [
						{
							value: {
								lineValue: 'M',
							},
						},
					],
					BIRT: [{
					}, ],
					value: {
						xrefId: '@I2@',
					},
				},
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										lineValue: 'Joe',
									},
								},
							],
							SURN: [
								{
									value: {
										lineValue: 'Bloggs',
									},
								},
							],
						},
					],
					BIRT: [{
					}, ],
					value: {
						xrefId: '@I3@',
					},
				},
			], },
		personsIds: {
			'@I1@': 1000000,
			'@I2@': 1000001,
			'@I3@': 1000002,
		},
		expectedPersons: [
			{
				Id: 1000000,
				IsLiving: true,
				Gender: 2,
				DateCreated: 'mock date string',
				Names: [
					{
						FactTypeId: 100,
						GivenNames: 'Jane',
						Surnames: 'Doe',
					},
				],
				Facts: [
					{
						DateDetail: '1 Jan 1990',
						FactTypeId: 405,
						Preferred: true,
					},
				],
			},
			{
				Id: 1000001,
				IsLiving: true,
				Gender: 1,
				DateCreated: 'mock date string',
				Names: [
					{
						FactTypeId: 100,
						GivenNames: 'John',
						Surnames: 'Smith',
					},
				],
				Facts: [
					{
						FactTypeId: 405,
						Preferred: true,
					},
				],
			},
			{
				Id: 1000002,
				IsLiving: true,
				Gender: 0,
				DateCreated: 'mock date string',
				Names: [
					{
						FactTypeId: 100,
						GivenNames: 'Joe',
						Surnames: 'Bloggs',
					},
				],
				Facts: [
					{
						FactTypeId: 405,
						Preferred: true,
					},
				],
			},
		],
	};

	describe('with parameters to build persons', () => {
		it.each([
			noIndividualsCase,
			oneIndividualCase,
			multipleIndividualsCase,
		])(
			'builds the expected persons',
			({
				gedcom,
				personsIds,
				expectedPersons,
			}) => {
				const actualPersons = buildFmpPersons(
					gedcom,
					personsIds
				);

				expect(actualPersons).toStrictEqual(expectedPersons);
			}
		);
	});
});