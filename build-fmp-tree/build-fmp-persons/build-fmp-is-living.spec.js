'use strict';

const { buildFmpIsLiving, } = require('./build-fmp-is-living');

describe('buildFmpBirthFact', () => {
	const structuredGedcoms = [
		[
			{},
			true,
		],
		[
			{
				DEAT: [{
					value: {
						level: 2,
						lineValue: '1960',
						tag: 'DATE',
						xrefId: null,
					},
				}, ],
			},
			false,
		],
	];

	describe('when given structured gedcom', () => {
		it.each(structuredGedcoms)(
			'builds an \'IsLiving\' property',
			(structuredGedcom, expectedIsLiving) => {
				const actualIsLiving = buildFmpIsLiving(structuredGedcom);

				expect(actualIsLiving).toStrictEqual(expectedIsLiving);
			}
		);
	});
});

