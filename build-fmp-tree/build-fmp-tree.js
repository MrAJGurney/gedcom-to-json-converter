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

	const gedcomIndividuals =
	structuredGedcom.hasOwnProperty(gedcomIndividualTag)
		? structuredGedcom[gedcomIndividualTag]
		: [];

	const fmpPersons = gedcomIndividuals.map(gedcomIndividual => {
		const xrefId = getXrefId(gedcomIndividual.value);
		const personId = personsIdGenerator.next().value;

		const fmpPerson = buildFmpPerson(gedcomIndividual, personId);

		gedcomIndividualXrefIdToFmpPersonId.set(xrefId, personId);

		return fmpPerson;
	});

	const gedcomFamilies =
	structuredGedcom.hasOwnProperty(gedcomFamilyTag)
		? structuredGedcom[gedcomFamilyTag]
		: [];

	let fmpChilds = [];
	const fmpFamilys = gedcomFamilies.map(gedcomFamily => {
		const fmpFamilyId = familysIdGenerator.next().value;

		const gedcomChildren =
			gedcomFamily.hasOwnProperty(gedcomChildTag)
				? gedcomFamily[gedcomChildTag]
				: [];

		const fmpChildsForFamily = gedcomChildren.map(
			gedcomChild => {
				const childgedcomXrefId = getLineValue(gedcomChild.value);
				const childFmpId = gedcomIndividualXrefIdToFmpPersonId
					.get(childgedcomXrefId);

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

	const gedcomDate = structuredGedcom
		[gedcomChangeTag][0]
		[gedcomDateTag][0];

	const gedcomDateTimeValues = [getLineValue(gedcomDate.value), ];

	if (gedcomDate.hasOwnProperty(gedcomTimeTag)) {
		const gedcomTime = gedcomDate[gedcomTimeTag][0];
		gedcomDateTimeValues.push(getLineValue(gedcomTime.value));
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