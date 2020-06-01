'use strict';

const { buildFmpGender, } = require('./build-fmp-gender');

describe('buildFmpBirthFact', () => {
	const noGenderCase = {
		gedcomPerson: {},
		expectedGender: 0,
	};

	const unknownGenderCase = {
		gedcomPerson: {
			SEX: [{
				value: {
					lineValue: 'U',
				},
			}, ],
		},
		expectedGender: 0,
	};

	const maleGenderCase = {
		gedcomPerson: {
			SEX: [{
				value: {
					lineValue: 'M',
				},
			}, ],
		},
		expectedGender: 1,
	};

	const femaleGenderCase = {
		gedcomPerson: {
			SEX: [{
				value: {
					lineValue: 'F',
				},
			}, ],
		},
		expectedGender: 2,
	};

	describe('with parameters to build a gender', () => {
		it.each([
			noGenderCase,
			unknownGenderCase,
			maleGenderCase,
			femaleGenderCase,
		])(
			'builds the expected gender',
			({ gedcomPerson, expectedGender, }) => {
				const actualGender = buildFmpGender(gedcomPerson);

				expect(actualGender).toStrictEqual(expectedGender);
			}
		);
	});
});

