'use strict';

const { buildFmpDateCreated, } = require('./build-fmp-date-created');

describe('buildFmpDateCreated', () => {
	const structuredGedcoms = [
		[
			{
				'CHAN': [{
					'DATE': [{
						'value': '2 DATE 10 May 2010',
					}, ],
					'value': '1 CHAN',
				}, ],
			},
			'2010-05-10T00:00:00',
		],
		[
			{
				'CHAN': [{
					'DATE': [{
						'TIME': [{
							'value': '3 TIME 16:38:50',
						}, ],
						'value': '2 DATE 15 APR 2020',
					}, ],
					'value': '1 CHAN',
				}, ],
			},
			'2020-04-15T16:38:50',
		],
	];

	describe('when given structured gedcom', () => {
		it.each(structuredGedcoms)(
			'builds a \'DateCreated\' property',
			(structuredGedcom, expectedDateCreated) => {
				const actualDateCreated = buildFmpDateCreated(structuredGedcom);

				expect(actualDateCreated).toStrictEqual(expectedDateCreated);
			}
		);
	});
});