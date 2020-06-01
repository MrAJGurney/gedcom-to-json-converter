'use strict';

const { buildFmpNameFact, } = require('./build-fmp-name-fact');

describe('buildFmpBirthFact', () => {
	const structuredGedcoms = [
		[
			{
				NAME: [{
					GIVN: [{
						value: {
							level: 2,
							lineValue: 'John',
							tag: 'GIVN',
							xrefId: null,
						},
					}, ],
					SURN: [{
						value: {
							level: 2,
							lineValue: 'Smith',
							tag: 'SURN',
							xrefId: null,
						},
					}, ],
					value: {
						level: 1,
						lineValue: 'John /Smith/',
						tag: 'NAME',
						xrefId: null,
					},
				}, ],
			},
			{
				FactTypeId: 100,
				GivenNames: 'John',
				Surnames: 'Smith',
			},
		],
		[
			{
				NAME: [{
					GIVN: [{
						value: {
							level: 2,
							lineValue: 'Jane',
							tag: 'GIVN',
							xrefId: null,
						},
					}, ],
					SURN: [{
						value: {
							level: 2,
							lineValue: 'Doe',
							tag: 'SURN',
							xrefId: null,
						},
					}, ],
					value: {
						level: 2,
						lineValue: 'Jane /Doe/',
						tag: 'NAME',
						xrefId: null,
					},
				}, ],
			},
			{
				FactTypeId: 100,
				GivenNames: 'Jane',
				Surnames: 'Doe',
			},
		],
	];

	describe('when given structured gedcom', () => {
		it.each(structuredGedcoms)(
			'builds a name fact',
			(structuredGedcom, expectedNameFact) => {
				const actualNameFact = buildFmpNameFact(structuredGedcom);

				expect(actualNameFact).toStrictEqual(expectedNameFact);
			}
		);
	});
});

