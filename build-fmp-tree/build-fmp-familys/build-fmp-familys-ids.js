'use strict';

const { buildFmpIdGenerator, } = require('../build-fmp-id-generator');

const GEDCOM_FAMILY_TAG = 'FAM';

const buildFmpFamilysIds = structuredGedcom => {
	const initialValue = 1;
	const increment = 1;
	const familyIdGenerator = buildFmpIdGenerator(initialValue, increment);

	const gedcomFamilies = getGedcomFamilies(structuredGedcom);

	const fmpFamilysIds = {};

	gedcomFamilies.forEach(family => {
		const { value: { xrefId, }, } = family;
		fmpFamilysIds[xrefId] = familyIdGenerator.next().value;
	});

	return fmpFamilysIds;
};

const getGedcomFamilies = structuredGedcom => {
	if (!structuredGedcom.hasOwnProperty(GEDCOM_FAMILY_TAG)) {
		return [];
	}

	return structuredGedcom[GEDCOM_FAMILY_TAG];
};

module.exports = { buildFmpFamilysIds, };