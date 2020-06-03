'use strict';

const { buildFmpPerson, } = require('./build-fmp-person');

const GEDCOM_INDIVIDUAL_TAG = 'INDI';

const buildFmpPersons = (gedcom, personsIds) => {
	const gedcomIndividuals = getGedcomIndividuals(gedcom);

	const fmpPersons = gedcomIndividuals.map(individual => {
		const { value: { xrefId, }, } = individual;
		const personId = personsIds[xrefId];
		const fmpPerson = buildFmpPerson(individual, personId);
		return fmpPerson;
	});

	return fmpPersons;
};

const getGedcomIndividuals = gedcom => {
	if (!gedcom.hasOwnProperty(GEDCOM_INDIVIDUAL_TAG)) {
		return [];
	}

	return gedcom[GEDCOM_INDIVIDUAL_TAG];
};

module.exports = { buildFmpPersons, };