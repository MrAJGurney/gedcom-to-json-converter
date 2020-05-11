'use strict';

const { structureGedcom, } = require('./structure-gedcom');
const { buildFmpPerson, } = require('./build-fmp-person');
const {
	getXrefId,
	getLineValue,
} = require('./get-gedcom-components');

const buildFmpTree = gedcomLines => {
	const gedcomIndividualTag = 'INDI';
	const gedcomFamilyTag = 'FAM';
	const gedcomChildTag = 'CHIL';

	const gedcomIndividualXrefIdToFmpPersonId = new Map();
	const personsIdGenerator = idGenerator(1000000000, 1);
	const familysIdGenerator = idGenerator(-1, -1);
	const childsIdGenerator = idGenerator(-101, -1);

	const structuredGedcom = structureGedcom(gedcomLines);

	const structuredGedcomIndividuals =
		structuredGedcom.hasOwnProperty(gedcomIndividualTag)
			? structuredGedcom[gedcomIndividualTag]
			: [];

	const fmpPersons = structuredGedcomIndividuals.map(gedcomIndividual => {
		const xrefId = getXrefId(gedcomIndividual.value);
		const personId = personsIdGenerator.next().value;

		const fmpPerson = buildFmpPerson(gedcomIndividual, personId);

		gedcomIndividualXrefIdToFmpPersonId.set(xrefId, personId);

		return fmpPerson;
	});

	const structuredGedcomFamilies =
		structuredGedcom.hasOwnProperty(gedcomFamilyTag)
			? structuredGedcom[gedcomFamilyTag]
			: [];

	let fmpChilds = [];
	const fmpFamilys = structuredGedcomFamilies.map(gedcomFamily => {
		const fmpFamilyId = familysIdGenerator.next().value;

		const structuredGedcomChildren =
			gedcomFamily.hasOwnProperty(gedcomChildTag)
				? gedcomFamily[gedcomChildTag]
				: [];

		const fmpChildsForFamily = structuredGedcomChildren.map(
			gedcomChild => {
				const childGedcomXrefId = getLineValue(gedcomChild.value);
				const childFmpId = gedcomIndividualXrefIdToFmpPersonId
					.get(childGedcomXrefId);

				return {
					'FamilyId': fmpFamilyId,
					'RelationshipToFather': 1,
					'RelationshipToMother': 1,
					'ChildId': childFmpId,
					'Id': childsIdGenerator.next().value,
				};
			}
		);
		fmpChilds = fmpChilds.concat(fmpChildsForFamily);

		return {
			'Id': fmpFamilyId,
			'DateCreated': buildDateCreated(gedcomFamily),
			'MotherId': gedcomIndividualXrefIdToFmpPersonId
				.get(getLineValue(gedcomFamily['WIFE'][0].value)),
			'FatherId': gedcomIndividualXrefIdToFmpPersonId
				.get(getLineValue(gedcomFamily['HUSB'][0].value)),
		};
	});

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

function* idGenerator(initialValue, increment) {
	let value = initialValue;
	while (true) {
		yield value;
		value += increment;
	}
}

const buildDateCreated = structuredGedcom => {
	const gedcomChangeTag = 'CHAN';
	const gedcomDateTag = 'DATE';
	const gedcomTimeTag = 'TIME';

	const structuredGedcomDate = structuredGedcom
		[gedcomChangeTag][0]
		[gedcomDateTag][0];

	const gedcomDateTimeValues = [getLineValue(structuredGedcomDate.value), ];

	if (structuredGedcomDate.hasOwnProperty(gedcomTimeTag)) {
		const structuredGedcomTime = structuredGedcomDate[gedcomTimeTag][0];
		gedcomDateTimeValues.push(getLineValue(structuredGedcomTime.value));
	}

	const combinedDateTimeValue = gedcomDateTimeValues.join(' ');

	const epoch = Date.parse(combinedDateTimeValue);
	const millisecondsInMinute = 60 * 1000;
	const timezoneOffset = (
		new Date(combinedDateTimeValue)
	).getTimezoneOffset();

	const fmpDateWithTail = new Date(
		epoch - (timezoneOffset * millisecondsInMinute)
	);

	const fmpDate = fmpDateWithTail.toISOString().split('.')[0];

	return fmpDate;
};

module.exports = {
	buildFmpTree,
};