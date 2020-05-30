'use strict';

const { buildFmpPerson, } = require('./build-fmp-person');

const GEDCOM_INDIVIDUAL_TAG = 'INDI';

const buildFmpPersons = (structuredGedcom, fmpPersonsIds) => {
	const gedcomIndividuals = getGedcomIndividuals(structuredGedcom);

	const fmpPersons = gedcomIndividuals.map(individual => {
		const { value: { xrefId, }, } = individual;
		const personId = fmpPersonsIds[xrefId];
		const fmpPerson = buildFmpPerson(individual, personId);
		return fmpPerson;
	});

	return fmpPersons;
};

const getGedcomIndividuals = structuredGedcom => {
	if (!structuredGedcom.hasOwnProperty(GEDCOM_INDIVIDUAL_TAG)) {
		return [];
	}

	return structuredGedcom[GEDCOM_INDIVIDUAL_TAG];
};

module.exports = { buildFmpPersons, };