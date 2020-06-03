'use strict';

const { buildFmpIdGenerator, } = require('../build-fmp-id-generator');
const { buildFmpChild, } = require('./build-fmp-child');

const GEDCOM_FAMILY_TAG = 'FAM';
const GEDCOM_CHILD_TAG = 'CHIL';

const buildFmpChilds = (gedcom, personsIds, familysIds) => {
	const gedcomChildrenAndFamilyId
		= getGedcomChildrenAndFamilyId(gedcom, familysIds);

	const initialValue = -1;
	const increment = -1;
	const childIdGenerator = buildFmpIdGenerator(initialValue, increment);

	const fmpChilds = gedcomChildrenAndFamilyId.map(childAndFamilyId => {
		const { gedcomChild, familyId, } = childAndFamilyId;
		const childId = childIdGenerator.next().value;

		const fmpChild = buildFmpChild(
			gedcomChild,
			personsIds,
			familyId,
			childId
		);
		return fmpChild;
	});

	return fmpChilds;
};

const getGedcomChildrenAndFamilyId = (gedcom, familysIds) => {
	if (!gedcom.hasOwnProperty(GEDCOM_FAMILY_TAG)) {
		return [];
	}

	const gedcomFamilys = gedcom[GEDCOM_FAMILY_TAG];

	const gedcomChildrenAndFamilyId = [];

	gedcomFamilys.forEach(family => {
		if (family.hasOwnProperty(GEDCOM_CHILD_TAG)) {
			const { value: { xrefId, }, } = family;
			const familyId = familysIds[xrefId];

			const gedcomChildren = family[GEDCOM_CHILD_TAG];

			gedcomChildren.forEach(gedcomChild => {
				gedcomChildrenAndFamilyId.push({
					gedcomChild,
					familyId,
				});
			});
		}
	});

	return gedcomChildrenAndFamilyId;
};

module.exports = { buildFmpChilds, };