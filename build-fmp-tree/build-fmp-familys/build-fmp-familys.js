'use strict';

const { buildFmpFamily, } = require('./build-fmp-family');

const GEDCOM_FAMILY_TAG = 'FAM';

const buildFmpFamilys = (structuredGedcom, fmpPersonsIds, fmpFamilysIds) => {
	const gedcomFamilies = getGedcomFamilys(structuredGedcom);

	const fmpFamilys = gedcomFamilies.map(gedcomFamily => {
		const { value: { xrefId, }, } = gedcomFamily;
		const familyId = fmpFamilysIds[xrefId];
		const fmpFamily = buildFmpFamily(gedcomFamily, fmpPersonsIds, familyId);
		return fmpFamily;
	});

	return fmpFamilys;
};

const getGedcomFamilys = structuredGedcom => {
	if (!structuredGedcom.hasOwnProperty(GEDCOM_FAMILY_TAG)) {
		return [];
	}

	return structuredGedcom[GEDCOM_FAMILY_TAG];
};

module.exports = { buildFmpFamilys, };