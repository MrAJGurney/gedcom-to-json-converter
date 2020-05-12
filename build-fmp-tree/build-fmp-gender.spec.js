'use strict';

const { buildFmpGender, } = require('./build-fmp-gender');

describe('buildFmpBirthFact', () => {
	const structuredGedcoms = [
		[
			{},
			0,
		],
		[
			{
				'SEX': [{
					'value': '1 SEX U',
				}, ],
			},
			0,
		],
		[
			{
				'SEX': [{
					'value': '1 SEX M',
				}, ],
			},
			1,
		],
		[
			{
				'SEX': [{
					'value': '1 SEX F',
				}, ],
			},
			2,
		],
	];

	describe('when given structured gedcom', () => {
		it.each(structuredGedcoms)(
			'builds a \'gender\' property',
			(structuredGedcom, expectedGender) => {
				const actualGender = buildFmpGender(structuredGedcom);

				expect(actualGender).toStrictEqual(expectedGender);
			}
		);
	});
});

