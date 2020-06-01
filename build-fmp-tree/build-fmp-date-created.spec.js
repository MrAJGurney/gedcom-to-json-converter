'use strict';

const { buildFmpDateCreated, } = require('./build-fmp-date-created');

describe('buildFmpDateCreated', () => {
	const structuredGedcoms = [
		[
			{
				CHAN: [{
					DATE: [{
						value: {
							level: 2,
							lineValue: '10 May 2010',
							tag: 'DATE',
							xrefId: null,
						},
					}, ],
					value: {
						level: 1,
						lineValue: null,
						tag: 'CHAN',
						xrefId: null,
					},
				}, ],
			},
			'2010-05-10T00:00:00',
		],
		[
			{
				CHAN: [{
					DATE: [{
						TIME: [{
							value: {
								level: 3,
								lineValue: '16:38:50',
								tag: 'TIME',
								xrefId: null,
							},
						}, ],
						value: {
							level: 2,
							lineValue: '15 APR 2020',
							tag: 'DATE',
							xrefId: null,
						},
					}, ],
					value: '1 CHAN',
					value: {
						level: 1,
						lineValue: null,
						tag: 'CHAN',
						xrefId: null,
					},
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