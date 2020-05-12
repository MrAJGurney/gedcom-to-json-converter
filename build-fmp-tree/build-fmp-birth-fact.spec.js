'use strict';

const { buildFmpBirthFact, } = require('./build-fmp-birth-fact');

describe('buildFmpBirthFact', () => {
	const structuredGedcoms = [
		[
			{},
			{
				'FactTypeId': 405,
				'Preferred': true,
			},
		],
		[
			{
				'BIRT': [{
					'value': '1 BIRT',
				}, ],
			},
			{
				'FactTypeId': 405,
				'Preferred': true,
			},
		],
		[
			{
				'BIRT': [{
					'PLAC': [{
						'value': '2 PLAC Dundee',
					}, ],
					'value': '1 BIRT',
				}, ],
			},
			{
				'FactTypeId': 405,
				'Place': {
					'PlaceName': 'Dundee',
				},
				'Preferred': true,
			},
		],
		[
			{
				'BIRT': [{
					'DATE': [{
						'value': '2 DATE 1 Jan 1990',
					}, ],
					'value': '1 BIRT',
				}, ],
			},
			{
				'FactTypeId': 405,
				'DateDetail': '1 Jan 1990',
				'Preferred': true,
			},
		],
		[
			{
				'BIRT': [{
					'PLAC': [{
						'value': '2 PLAC Dundee',
					}, ],
					'DATE': [{
						'value': '2 DATE 1 Jan 1990',
					}, ],
					'value': '1 BIRT',
				}, ],
			},
			{
				'FactTypeId': 405,
				'DateDetail': '1 Jan 1990',
				'Place': {
					'PlaceName': 'Dundee',
				},
				'Preferred': true,
			},
		],
	];

	describe('when given structured gedcom', () => {
		it.each(structuredGedcoms)(
			'builds a birth fact',
			(structuredGedcom, expectedBirthFact) => {
				const actualBirthFact = buildFmpBirthFact(structuredGedcom);

				expect(actualBirthFact).toStrictEqual(expectedBirthFact);
			}
		);
	});
});