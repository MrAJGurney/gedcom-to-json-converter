'use strict';

const buildFmpChild = (
	gedcomChild,
	personsIds,
	familyId,
	childId
) => {
	const gedcomId = gedcomChild.value.lineValue;
	const personId = personsIds[gedcomId];

	const fmpChild = {
		FamilyId: familyId,
		RelationshipToFather: 1,
		RelationshipToMother: 1,
		ChildId: personId,
		Id: childId,
	};

	return fmpChild;
};

module.exports = {
	buildFmpChild,
};