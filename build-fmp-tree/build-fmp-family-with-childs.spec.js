'use strict';

const { buildFmpFamilyWithChilds, } = require('./build-fmp-family-with-childs');

describe('buildFmpFamilyWithChilds', () => {
	function* childsIdGenerator() {
		let value = -101;
		while (true) {
			yield value;
			value -= 1;
		}
	}

	const structuredGedcoms = [
		[
			{
				'HUSB': [{
					'value': '1 HUSB @I1@',
				}, ],
				'WIFE': [{
					'value': '1 WIFE @I2@',
				}, ],
				'CHAN': [{
					'DATE': [{
						'TIME': [{
							'value': '3 TIME 16:43:01',
						}, ],
						'value': '2 DATE 15 APR 2020',
					}, ],
					'value': '1 CHAN',
				}, ],
			},
			-1,
			new Map([
				[
					'@I1@',
					1000000000,
				],
				[
					'@I2@',
					1000000001,
				],
			]),
			childsIdGenerator(),
			{
				'Id': -1,
				'DateCreated': '2020-04-15T16:43:01',
				'MotherId': 1000000001,
				'FatherId': 1000000000,
			},
			[],
		],
		[
			{
				'HUSB': [{
					'value': '1 HUSB @I3@',
				}, ],
				'WIFE': [{
					'value': '1 WIFE @I2@',
				}, ],
				'CHIL': [
					{
						'value': '1 CHIL @I1@',
					},
					{
						'value': '1 CHIL @I4@',
					},
				],
				'CHAN': [{
					'DATE': [{
						'TIME': [{
							'value': '3 TIME 16:43:01',
						}, ],
						'value': '2 DATE 15 APR 2020',
					}, ],
					'value': '1 CHAN',
				}, ],
			},
			-1,
			new Map([
				[
					'@I1@',
					1000000000,
				],
				[
					'@I2@',
					1000000001,
				],
				[
					'@I3@',
					1000000002,
				],
				[
					'@I4@',
					1000000003,
				],
			]),
			childsIdGenerator(),
			{
				'Id': -1,
				'DateCreated': '2020-04-15T16:43:01',
				'MotherId': 1000000001,
				'FatherId': 1000000002,
			},
			[
				{
					'FamilyId': -1,
					'RelationshipToFather': 1,
					'RelationshipToMother': 1,
					'ChildId': 1000000000,
					'Id': -101,
				},
				{
					'FamilyId': -1,
					'RelationshipToFather': 1,
					'RelationshipToMother': 1,
					'ChildId': 1000000003,
					'Id': -102,
				},
			],
		],
	];

	describe('when given structured gedcom', () => {
		it.each(structuredGedcoms)(
			'builds the family and children ',
			(
				structuredGedcom,
				familyId,
				gedcomIdToFmpId,
				childsIdGenerator,
				expectedFamily,
				expectedChilds
			) => {
				const [actualFamily, actualChilds, ] = buildFmpFamilyWithChilds(
					structuredGedcom,
					familyId,
					gedcomIdToFmpId,
					childsIdGenerator
				);

				expect(actualFamily).toStrictEqual(expectedFamily);
				expect(actualChilds).toStrictEqual(expectedChilds);
			}
		);
	});
});

