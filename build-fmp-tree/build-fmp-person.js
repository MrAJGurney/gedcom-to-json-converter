'use strict';

const { getLineValue, } = require('./get-gedcom-components');

const buildFmpPerson = structuredGedcomIndividual => {
	const fmpPerson = {
		'IsLiving': buildIsLiving(structuredGedcomIndividual),
		'Gender': buildGender(structuredGedcomIndividual),
		'DateCreated': buildDateCreated(structuredGedcomIndividual),
		'Names': buildNames(structuredGedcomIndividual),
		'Facts': buildFacts(structuredGedcomIndividual),
	};

	return fmpPerson;
};

const buildIsLiving = structuredGedcomIndividual => {
	const gedcomDeathTag = 'DEAT';
	return !structuredGedcomIndividual.hasOwnProperty(gedcomDeathTag);
};

const buildGender = structuredGedcomIndividual => {
	const gedcomSexTag = 'SEX';
	const gedcomSexValues = {
		male: 'M',
		female: 'F',
		undetermined: 'U',
	};

	const fmpSexValues = {
		male: 1,
		female: 2,
		unknown: 0,
	};

	const structuredGedcomSex = structuredGedcomIndividual[gedcomSexTag][0];

	switch (getLineValue(structuredGedcomSex.value)) {
	case gedcomSexValues.male:
		return fmpSexValues.male;
	case gedcomSexValues.female:
		return fmpSexValues.female;
	case gedcomSexValues.undetermined:
		return fmpSexValues.unknown;
	}
};

const buildDateCreated = structuredGedcomIndividual => {
	const gedcomChangeTag = 'CHAN';
	const gedcomDateTag = 'DATE';
	const gedcomTimeTag = 'TIME';

	const structuredGedcomDate = structuredGedcomIndividual
		[gedcomChangeTag][0]
		[gedcomDateTag][0];

	const structuredGedcomTime = structuredGedcomDate
		[gedcomTimeTag][0];

	const gedcomDateValue = getLineValue(structuredGedcomDate.value);
	const gedcomTimeValue = getLineValue(structuredGedcomTime.value);

	const gedcomDateTimeValue = [gedcomDateValue, gedcomTimeValue, ].join(' ');

	const epoch = Date.parse(gedcomDateTimeValue);
	const millisecondsInMinute = 60 * 1000;
	const timezoneOffset = (new Date(gedcomDateTimeValue)).getTimezoneOffset();

	const fmpDateWithTail = new Date(
		epoch - (timezoneOffset * millisecondsInMinute)
	);

	const fmpDate = fmpDateWithTail.toISOString().split('.')[0];

	return fmpDate;
};

const buildNames = structuredGedcomIndividual => {
	const gedcomNameTag = 'NAME';
	const gedcomGivenNameTag = 'GIVN';
	const gedcomSurnameTag = 'SURN';

	const structuredGedcomName = structuredGedcomIndividual[gedcomNameTag][0];

	const gedcomGivenName = structuredGedcomName[gedcomGivenNameTag][0];
	const gedcomSurname = structuredGedcomName[gedcomSurnameTag][0];

	return [{
		'FactTypeId': 100,
		'GivenNames': getLineValue(gedcomGivenName.value),
		'Surnames': getLineValue(gedcomSurname.value),
	}, ];
};

const buildFacts = structuredGedcomIndividual => {
	const gedcomBirthTag = 'BIRT';
	const gedcomDateTag = 'DATE';
	const gedcomPlaceTag = 'PLAC';

	const structuredGedcomBirth = structuredGedcomIndividual[gedcomBirthTag][0];

	const gedcomDate = structuredGedcomBirth[gedcomDateTag][0];
	const gedcomPlace = structuredGedcomBirth[gedcomPlaceTag][0];

	return [{
		'FactTypeId': 405,
		'DateDetail': getLineValue(gedcomDate.value),
		'Place': {
			'PlaceName': getLineValue(gedcomPlace.value),
		},
		'Preferred': true,
	}, ];
};

module.exports =  {
	buildFmpPerson,
	buildGender, // exported for 100% test coverage
};