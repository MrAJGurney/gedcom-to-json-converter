'use strict';

const { structureGedcom, } = require('./structure-gedcom');
const { buildFmpPerson, } = require('./build-fmp-person');

const buildFmpTree = gedcomLines => {

	const structuredGedcom = structureGedcom(gedcomLines);
	const fmpPersons = buildPersons(structuredGedcom);

	const personId = idGenerator(1000000, 1);
	fmpPersons.forEach(person => person.Id = personId.next().value);

	return {
		'Persons': fmpPersons,
		'Familys': [],
		'Childs': [],
		'SourceRepos': [],
		'MasterSources': [],
		'Medias': [],
		'FactTypes': [],
	};
};

function* idGenerator(initialValue, increment) {
	let value = initialValue;
	while (true) {
		yield value;
		value += increment;
	}
}

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