'use strict';

const { buildFmpIdGenerator, } = require('../build-fmp-id-generator');
const { buildFmpChild, } = require('./build-fmp-child');

const GEDCOM_FAMILY_TAG = 'FAM';
const GEDCOM_CHILD_TAG = 'CHIL';

const buildFmpChilds = (structuredGedcom, fmpPersonsIds, fmpFamilysIds) => {
	const gedcomChildrenWithFamilyIds
		= getGedcomChildrenWithFamilyIds(structuredGedcom, fmpFamilysIds);

	const initialValue = -1;
	const increment = -1;
	const childIdGenerator = buildFmpIdGenerator(initialValue, increment);

	const fmpChilds = gedcomChildrenWithFamilyIds.map(childWithFamilyId => {
		const { gedcomChild, familyId, } = childWithFamilyId;
		const childId = childIdGenerator.next().value;

		const fmpChild = buildFmpChild(
			gedcomChild,
			fmpPersonsIds,
			familyId,
			childId
		);
		return fmpChild;
	});

	return fmpChilds;
};

const getGedcomChildrenWithFamilyIds = (structuredGedcom, fmpFamilysIds) => {
	if (!structuredGedcom.hasOwnProperty(GEDCOM_FAMILY_TAG)) {
		return [];
	}

	const gedcomFamilys = structuredGedcom[GEDCOM_FAMILY_TAG];

	const gedcomChildrenWithIds = [];

	gedcomFamilys.forEach(family => {
		if (family.hasOwnProperty(GEDCOM_CHILD_TAG)) {
			const { value: { xrefId, }, } = family;
			const familyId = fmpFamilysIds[xrefId];

			const gedcomChildren = family[GEDCOM_CHILD_TAG];

			gedcomChildren.forEach(gedcomChild => {
				gedcomChildrenWithIds.push({
					gedcomChild,
					familyId,
				});
			});
		}
	});

	return gedcomChildrenWithIds;
};

module.exports = { buildFmpChilds, };