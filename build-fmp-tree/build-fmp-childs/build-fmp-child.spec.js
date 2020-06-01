'use strict';

const { buildFmpChild, } = require('./build-fmp-child');

describe('buildFmpChild', () => {
	const simpleCase = {
		gedcomChild: {
			value: {
				lineValue: '@I1@',
			},
		},
		personsIds: {
			'@I1@': 1000000000,
		},
		familyId: -1,
		childId: -101,
		expectedChild: {
			FamilyId: -1,
			RelationshipToFather: 1,
			RelationshipToMother: 1,
			ChildId: 1000000000,
			Id: -101,
		},
	};

	describe('with parameters to build a child', () => {
		it.each([
			simpleCase,
		])(
			'builds the expected child',
			({
				gedcomChild,
				personsIds,
				familyId,
				childId,
				expectedChild,
			}) => {
				const actualChild = buildFmpChild(
					gedcomChild,
					personsIds,
					familyId,
					childId
				);

				expect(actualChild).toStrictEqual(expectedChild);
			}
		);
	});
});

