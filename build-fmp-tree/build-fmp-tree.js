'use strict';

const { structureGedcom, } = require('./structure-gedcom');
const { buildFmpPersonWithIdMap, } = require('./build-fmp-person-with-id-map');
const { buildFmpFamilyWithChilds, } = require('./build-fmp-family-with-childs');

const gedcomIndividualTag = 'INDI';
const gedcomFamilyTag = 'FAM';

const buildFmpTree = gedcomLines => {
	const structuredGedcom = structureGedcom(gedcomLines);

	const [
		fmpPersons,
		gedcomIdToFmpId,
	] = buildFmpPersonWithIdMaps(structuredGedcom);

	const [
		fmpFamilys,
		fmpChilds,
	] = buildFmpFamilysAndChilds(structuredGedcom, gedcomIdToFmpId);

	return {
		'Persons': fmpPersons,
		'Familys': fmpFamilys,
		'Childs': fmpChilds,
		'SourceRepos': [],
		'MasterSources': [],
		'Medias': [],
		'FactTypes': [],
	};
};

const buildFmpPersonWithIdMaps = structuredGedcom => {
	const personsIdGenerator = idGenerator(1000000000, 1);

	const gedcomIndividuals =
	structuredGedcom.hasOwnProperty(gedcomIndividualTag)
		? structuredGedcom[gedcomIndividualTag]
		: [];

	const gedcomIdToFmpId = new Map();
	const fmpPersons = gedcomIndividuals.map(gedcomIndividual => {
		const xrefId = gedcomIndividual.value.xrefId;
		const personId = personsIdGenerator.next().value;

		const fmpPerson = buildFmpPersonWithIdMap(gedcomIndividual, personId);

		gedcomIdToFmpId.set(xrefId, personId);

		return fmpPerson;
	});

	return [
		fmpPersons,
		gedcomIdToFmpId,
	];
};

const buildFmpFamilysAndChilds = (structuredGedcom, gedcomIdToFmpId) => {
	const familysIdGenerator = idGenerator(-1, -1);
	const childsIdGenerator = idGenerator(-101, -1);

	const gedcomFamilies =
	structuredGedcom.hasOwnProperty(gedcomFamilyTag)
		? structuredGedcom[gedcomFamilyTag]
		: [];

	let fmpChilds = [];
	const fmpFamilys = gedcomFamilies.map(gedcomFamily => {
		const familyId = familysIdGenerator.next().value;

		const [ fmpFamily, fmpChildsForFamily, ] = buildFmpFamilyWithChilds(
			gedcomFamily,
			familyId,
			gedcomIdToFmpId,
			childsIdGenerator
		);

		fmpChilds = fmpChilds.concat(fmpChildsForFamily);

		return fmpFamily;
	});

	return [
		fmpFamilys,
		fmpChilds,
	];
};

function* idGenerator(initialValue, increment) {
	let value = initialValue;
	while (true) {
		yield value;
		value += increment;
	}
}

module.exports = {
	buildFmpTree,
};