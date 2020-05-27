'use strict';

const buildFmpChild = (
	gedcomChild,
	gedcomIdToFmpId,
	familyId,
	childId
) => {

	const gedcomId = gedcomChild.value.lineValue;
	const personId = gedcomIdToFmpId.get(gedcomId);

	const fmpChild = {
		'FamilyId': familyId,
		'RelationshipToFather': 1,
		'RelationshipToMother': 1,
		'ChildId': personId,
		'Id': childId,
	};

	return fmpChild;
};

module.exports = {
	buildFmpChild,
};