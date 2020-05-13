'use strict';

const { getLineValue, } = require('./get-gedcom-components');

const buildFmpChild = (
	gedcomChild,
	gedcomIdToFmpId,
	familyId,
	childId
) => {

	const gedcomId = getLineValue(gedcomChild.value);
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