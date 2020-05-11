'use strict';

const { structureGedcom, } = require('./structure-gedcom');
const { buildFmpPerson, } = require('./build-fmp-person');

const buildFmpTree = gedcomLines => {

	const structuredGedcom = structureGedcom(gedcomLines);

	return {
		'Persons': buildPersons(structuredGedcom),
		'Familys': [],
		'Childs': [],
		'SourceRepos': [],
		'MasterSources': [],
		'Medias': [],
		'FactTypes': [],
	};
};

const buildPersons = structuredGedcom => {
	const gedcomIndividualTag = 'INDI';

	if (!structuredGedcom.hasOwnProperty(gedcomIndividualTag)) {
		return [];
	}

	const gedcomIndividuals = structuredGedcom[gedcomIndividualTag];
	const fmpPersons = gedcomIndividuals.map(
		gedcomIndividual => buildFmpPerson(gedcomIndividual)
	);

	return fmpPersons;
};

module.exports = {
	buildFmpTree,
};