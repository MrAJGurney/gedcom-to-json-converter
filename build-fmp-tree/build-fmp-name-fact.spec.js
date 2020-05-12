'use strict';

const { buildFmpNameFact, } = require('./build-fmp-name-fact');

describe('buildFmpBirthFact', () => {
	const structuredGedcoms = [
		[
			{
				'NAME': [{
					'GIVN': [{
						'value': '2 GIVN John',
					}, ],
					'SURN': [{
						'value': '2 SURN Smith',
					}, ],
					'value': '1 NAME John /Smith/',
				}, ],
			},
			{
				'FactTypeId': 100,
				'GivenNames': 'John',
				'Surnames': 'Smith',
			},
		],
		[
			{
				'NAME': [{
					'GIVN': [{
						'value': '2 GIVN Jane',
					}, ],
					'SURN': [{
						'value': '2 SURN Doe',
					}, ],
					'value': '1 NAME Jane /Doe/',
				}, ],
			},
			{
				'FactTypeId': 100,
				'GivenNames': 'Jane',
				'Surnames': 'Doe',
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

