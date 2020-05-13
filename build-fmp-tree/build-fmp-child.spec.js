'use strict';

const { buildFmpChild, } = require('./build-fmp-child');

describe('buildFmpChild', () => {
	const structuredGedcoms = [
		[
			{
				'value': '1 CHIL @I1@',
			},
			new Map([
				[
					'@I1@',
					1000000000,
				],
			]),
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
				'value': '1 CHIL @I2@',
			},
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

