'use strict';

const { structureGedcom, }
	= require('./structure-gedcom/structure-gedcom');

const { buildFmpPersonsIds, }
	= require('./build-fmp-persons/build-fmp-persons-ids');
const { buildFmpPersons, }
	= require('./build-fmp-persons/build-fmp-persons');

const { buildFmpFamilysIds, }
	= require('./build-fmp-familys/build-fmp-familys-ids');
const { buildFmpFamilys, }
	= require('./build-fmp-familys/build-fmp-familys');

const { buildFmpChilds, }
	= require('./build-fmp-childs/build-fmp-childs');

const buildFmpTree = gedcomLines => {
	const structuredGedcom = structureGedcom(gedcomLines);

	const fmpPersonsIds = buildFmpPersonsIds(structuredGedcom);

	const fmpFamilysIds = buildFmpFamilysIds(structuredGedcom);

	const fmpPersons = buildFmpPersons(
		structuredGedcom,
		fmpPersonsIds
	);

	const fmpFamilys = buildFmpFamilys(
		structuredGedcom,
		fmpPersonsIds,
		fmpFamilysIds
	);

	const fmpChilds = buildFmpChilds(
		structuredGedcom,
		fmpPersonsIds,
		fmpFamilysIds
	);

	return {
		Persons: fmpPersons,
		Familys: fmpFamilys,
		Childs: fmpChilds,
		SourceRepos: [],
		MasterSources: [],
		Medias: [],
		FactTypes: [],
	};
};

module.exports = {
	buildFmpTree,
};