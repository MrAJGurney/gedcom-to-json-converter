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
					'value': {
						'level': 1,
						'lineValue': '@I1@',
						'tag': 'HUSB',
						'xrefId': null,
					},
				}, ],
				'WIFE': [{
					'value': {
						'level': 1,
						'lineValue': '@I2@',
						'tag': 'WIFE',
						'xrefId': null,
					},
				}, ],
				'CHAN': [{
					'DATE': [{
						'TIME': [{
							'value': {
								'level': 3,
								'lineValue': '16:43:01',
								'tag': 'TIME',
								'xrefId': null,
							},
						}, ],
						'value': {
							'level': 2,
							'lineValue': '15 APR 2020',
							'tag': 'DATE',
							'xrefId': null,
						},
					}, ],
					'value': {
						'level': 1,
						'lineValue': null,
						'tag': 'CHAN',
						'xrefId': null,
					},
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
					'value': {
						'level': 1,
						'lineValue': '@I3@',
						'tag': 'HUSB',
						'xrefId': null,
					},
				}, ],
				'WIFE': [{
					'value': {
						'level': 1,
						'lineValue': '@I2@',
						'tag': 'WIFE',
						'xrefId': null,
					},
				}, ],
				'CHIL': [
					{
						'value': {
							'level': 1,
							'lineValue': '@I1@',
							'tag': 'CHIL',
							'xrefId': null,
						},
					},
					{
						'value': {
							'level': 1,
							'lineValue': '@I4@',
							'tag': 'CHIL',
							'xrefId': null,
						},
					},
				],
				'CHAN': [{
					'DATE': [{
						'TIME': [{
							'value': {
								'level': 3,
								'lineValue': '16:43:01',
								'tag': 'TIME',
								'xrefId': null,
							},
						}, ],
						'value': {
							'level': 2,
							'lineValue': '15 APR 2020',
							'tag': 'DATE',
							'xrefId': null,
						},
					}, ],
					'value': {
						'level': 1,
						'lineValue': null,
						'tag': 'CHAN',
						'xrefId': null,
					},
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

