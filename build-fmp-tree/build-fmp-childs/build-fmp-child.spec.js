'use strict';

const { buildFmpChild, } = require('./build-fmp-child');

describe('buildFmpChild', () => {
	const structuredGedcoms = [
		[
			{
				'value': {
					'level': 1,
					'lineValue': '@I1@',
					'tag': 'CHIL',
					'xrefId': null,
				},
			},
			{
				'@I1@': 1000000000,
			},
			-1,
			-101,
			{
				'FamilyId': -1,
				'RelationshipToFather': 1,
				'RelationshipToMother': 1,
				'ChildId': 1000000000,
				'Id': -101,
			},
		],
		[
			{
				'value': {
					'level': 1,
					'lineValue': '@I2@',
					'tag': 'CHIL',
					'xrefId': null,
				},
			},
			{
				'@I1@': 1000000000,
				'@I2@': 1000000001,

			},
			-3,
			-102,
			{
				'FamilyId': -3,
				'RelationshipToFather': 1,
				'RelationshipToMother': 1,
				'ChildId': 1000000001,
				'Id': -102,
			},
		],
	];

	describe('when given structured gedcom', () => {
		it.each(structuredGedcoms)(
			'builds a child',
			(
				structuredGedcom,
				gedcomIdToFmpId,
				familyId,
				childId,
				expectedChild
			) => {
				const actualChild = buildFmpChild(
					structuredGedcom,
					gedcomIdToFmpId,
					familyId,
					childId
				);

				expect(actualChild).toStrictEqual(expectedChild);
			}
		);
	});
});

