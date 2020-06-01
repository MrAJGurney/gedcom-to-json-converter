'use strict';

const { buildFmpFamily, } = require('./build-fmp-family');

jest.mock('../build-fmp-date-created');
const { buildFmpDateCreated, } = require('../build-fmp-date-created');

beforeEach(() => {
	jest.clearAllMocks();
	buildFmpDateCreated.mockImplementation(() => 'mock date string');
});

describe('buildFmpFamily', () => {
	const simpleCase = {
		gedcomFamily: {
			HUSB: [{
				value: {
					lineValue: '@I1@',
				},
			}, ],
			WIFE: [{
				value: {
					lineValue: '@I2@',
				},
			}, ],
		},
		personsIds: {
			'@I1@': 1000000000,
			'@I2@': 1000000001,
		},
		familyId: -1,
		expectedFamily: {
			Id: -1,
			DateCreated: 'mock date string',
			MotherId: 1000000001,
			FatherId: 1000000000,
		},
	};

	describe('with parameters to build a family', () => {
		it.each([
			simpleCase,
		])(
			'builds the expected family ',
			({
				gedcomFamily,
				personsIds,
				familyId,
				expectedFamily,
			}) => {
				const actualFamily = buildFmpFamily(
					gedcomFamily,
					personsIds,
					familyId
				);

				expect(actualFamily).toStrictEqual(expectedFamily);
			}
		);
	});
});

