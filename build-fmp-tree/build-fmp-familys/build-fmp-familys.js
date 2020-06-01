'use strict';

const { buildFmpFamily, } = require('./build-fmp-family');

const GEDCOM_FAMILY_TAG = 'FAM';

const buildFmpFamilys = (gedcom, personsIds, familysIds) => {
	const gedcomFamilies = getGedcomFamilys(gedcom);

	const fmpFamilys = gedcomFamilies.map(gedcomFamily => {
		const { value: { xrefId, }, } = gedcomFamily;
		const familyId = familysIds[xrefId];
		const fmpFamily = buildFmpFamily(gedcomFamily, personsIds, familyId);
		return fmpFamily;
	});

	return fmpFamilys;
};

const getGedcomFamilys = gedcom => {
	if (!gedcom.hasOwnProperty(GEDCOM_FAMILY_TAG)) {
		return [];
	}

	return gedcom[GEDCOM_FAMILY_TAG];
};

module.exports = { buildFmpFamilys, };