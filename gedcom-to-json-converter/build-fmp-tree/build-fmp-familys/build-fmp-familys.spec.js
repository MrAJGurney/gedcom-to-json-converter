'use strict';
const { buildFmpFamilys, } = require('./build-fmp-familys');

jest.mock('../build-fmp-date-created');
const { buildFmpDateCreated, } = require('../build-fmp-date-created');

beforeEach(() => {
	jest.clearAllMocks();
	buildFmpDateCreated.mockImplementation(() => 'mock date string');
});

describe('buildFmpFamilys', () => {
	const noFamilyCase = {
		gedcom: {},
		personsIds: {},
		familysIds: {},
		expectedFamilys: [],
	};

	const oneFamilyCase = {
		gedcom: {
			FAM: [
				{
					HUSB: [
						{
							value: {
								tag: 'HUSB',
								lineValue: '@I1@',
							},
						},
					],
					WIFE: [
						{
							value: {
								tag: 'WIFE',
								lineValue: '@I2@',
							},
						},
					],
					value: {
						xrefId: '@F1@',
					},
				},
			],
		},
		personsIds: {
			'@I1@': 1000000,
			'@I2@': 1000001,
		},
		familysIds: {
			'@F1@': 1,
		},
		expectedFamilys: [
			{
				Id: 1,
				DateCreated: 'mock date string',
				MotherId: 1000001,
				FatherId: 1000000,
			},
		],
	};

	const multipleFamiliesCase = {
		gedcom: {
			FAM: [
				{
					HUSB: [
						{
							value: {
								tag: 'HUSB',
								lineValue: '@I1@',
							},
						},
					],
					WIFE: [
						{
							value: {
								tag: 'WIFE',
								lineValue: '@I2@',
							},
						},
					],
					value: {
						xrefId: '@F1@',
					},
				},
				{
					HUSB: [
						{
							value: {
								tag: 'HUSB',
								lineValue: '@I3@',
							},
						},
					],
					WIFE: [
						{
							value: {
								tag: 'WIFE',
								lineValue: '@I4@',
							},
						},
					],
					value: {
						xrefId: '@F2@',
					},
				},
			],
		},
		personsIds: {
			'@I1@': 1000000,
			'@I2@': 1000001,
			'@I3@': 1000002,
			'@I4@': 1000003,
		},
		familysIds: {
			'@F1@': 1,
			'@F2@': 2,
		},
		expectedFamilys: [
			{
				Id: 1,
				DateCreated: 'mock date string',
				MotherId: 1000001,
				FatherId: 1000000,
			},
			{
				Id: 2,
				DateCreated: 'mock date string',
				MotherId: 1000003,
				FatherId: 1000002,
			},
		],
	};

	describe('with parameters to build families', () => {
		it.each([
			noFamilyCase,
			oneFamilyCase,
			multipleFamiliesCase,
		])(
			'builds the expected families',
			({
				gedcom,
				personsIds,
				familysIds,
				expectedFamilys,
			}) => {
				const actualFamilys = buildFmpFamilys(
					gedcom,
					personsIds,
					familysIds
				);

				expect(actualFamilys).toStrictEqual(expectedFamilys);
			}
		);
	});
});