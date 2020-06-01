'use strict';

const {
	buildFmpPerson,
} = require('./build-fmp-person');

jest.mock('../build-fmp-date-created');
const { buildFmpDateCreated, } = require('../build-fmp-date-created');

beforeEach(() => {
	jest.clearAllMocks();
	buildFmpDateCreated.mockImplementation(() => 'mock date string');
});

describe('buildFmpPerson', () => {
	const simplePersonCase = {
		gedcomIndividual: {
			NAME: [
				{
					GIVN: [
						{
							value: {
								lineValue: 'John',
							},
						},
					],
					SURN: [
						{
							value: {
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
		personId: 28,
		expectedPerson: {
			Id: 28,
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
					DateDetail: '1 Jan 1990',
					Preferred: true,
				},
			],
		},
	};

	describe('with parameters to build a person', () => {
		it.each([
			simplePersonCase,
		])(
			'builds the expected person',
			({
				gedcomIndividual,
				personId,
				expectedPerson,
			}) => {
				const actualFmpPerson =buildFmpPerson(
					gedcomIndividual, personId
				);

				expect(actualFmpPerson).toStrictEqual(expectedPerson);
			});
	}
	);
});