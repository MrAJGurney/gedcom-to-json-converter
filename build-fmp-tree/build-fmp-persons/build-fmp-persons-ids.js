'use strict';

const { buildFmpIdGenerator, } =  require('../build-fmp-id-generator');

const GEDCOM_INDIVIDUAL_TAG = 'INDI';

const buildFmpPersonsIds = structuredGedcom => {
	const initialValue = 1000000;
	const increment = 1;
	const personIdGenerator = buildFmpIdGenerator(initialValue, increment);

	const gedcomIndividuals = getGedcomIndividuals(structuredGedcom);

	const fmpPersonsIds = {};

	gedcomIndividuals.forEach(individual => {
		const { value: { xrefId, }, } = individual;
		fmpPersonsIds[xrefId] = personIdGenerator.next().value;
	});

	return fmpPersonsIds;
};

const getGedcomIndividuals = structuredGedcom => {
	if (!structuredGedcom.hasOwnProperty(GEDCOM_INDIVIDUAL_TAG)) {
		return [];
	}

	return structuredGedcom[GEDCOM_INDIVIDUAL_TAG];
};

module.exports = { buildFmpPersonsIds, };