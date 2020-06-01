'use strict';

const { buildFmpChilds, } = require('./build-fmp-childs');

jest.mock('../build-fmp-id-generator');
const { buildFmpIdGenerator, } = require('../build-fmp-id-generator');

function* buildMockIdGenerator (ids) {
	let idIndex = 0;
	while (true) {
		yield ids[idIndex];
		idIndex++;
	}
}

beforeEach(() => {
	jest.clearAllMocks();
});

describe('buildFmpChilds', () => {
	const noFamilyCase = {
		gedcom: {},
		personsIds: {},
		familysIds: {},
		childIds: [],
		expectedChilds: [],
	};

	const noChildrenCase = {
		gedcom: {
			FAM: [],
		},
		personsIds: {},
		familysIds: {
			'@F1@': 1,
		},
		childIds: [],
		expectedChilds: [],
	};

	const singleChildCase = {
		gedcom: {
			FAM: [
				{
					CHIL: [
						{
							value: {
								lineValue: '@I1@',
							},
						},
					],
					value: {
						xrefId: '@F1@',
						tag: 'FAM',
					},
				},
			],
		},
		personsIds: {
			'@I1@': 1000000,
		},
		familysIds: {
			'@F1@': 1,
		},
		childIds: [-100, ],
		expectedChilds: [
			{
				FamilyId: 1,
				RelationshipToFather: 1,
				RelationshipToMother: 1,
				ChildId: 1000000,
				Id: -100,
			},
		],
	};

	const multipleChildrenCase = {
		gedcom: {
			FAM: [
				{
					CHIL: [
						{
							value: {
								lineValue: '@I1@',
							},
						},
						{
							value: {
								lineValue: '@I2@',
							},
						},
					],
					value: {
						xrefId: '@F1@',
						tag: 'FAM',
					},
				},
			],
		},
		personsIds: {
			'@I1@': 1000000,
			'@I2@': 1000001,
		},
		familysIds: {
			'@F1@': 1,
		},
		childIds: [-100, -200, ],
		expectedChilds: [
			{
				FamilyId: 1,
				RelationshipToFather: 1,
				RelationshipToMother: 1,
				ChildId: 1000000,
				Id: -100,
			},
			{
				FamilyId: 1,
				RelationshipToFather: 1,
				RelationshipToMother: 1,
				ChildId: 1000001,
				Id: -200,
			},
		],
	};

	describe('with parameters to build children', () => {
		it.each([
			noFamilyCase,
			noChildrenCase,
			singleChildCase,
			multipleChildrenCase,
		])(
			'builds the expected children',
			({
				gedcom,
				personsIds,
				familysIds,
				childIds,
				expectedChilds,
			}) => {
				buildFmpIdGenerator.mockImplementationOnce(
					() => buildMockIdGenerator(childIds)
				);

				const actualChilds = buildFmpChilds(
					gedcom,
					personsIds,
					familysIds
				);

				expect(actualChilds).toStrictEqual(expectedChilds);
			}
		);
	});
});