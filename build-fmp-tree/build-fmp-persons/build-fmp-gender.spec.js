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
				SEX: [{
					value: {
						level: 1,
						lineValue: 'U',
						tag: 'SEX',
						xrefId: null,
					},
				}, ],
			},
			0,
		],
		[
			{
				SEX: [{
					value: {
						level: 1,
						lineValue: 'M',
						tag: 'SEX',
						xrefId: null,
					},
				}, ],
			},
			1,
		],
		[
			{
				SEX: [{
					value: {
						level: 1,
						lineValue: 'F',
						tag: 'SEX',
						xrefId: null,
					},
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

