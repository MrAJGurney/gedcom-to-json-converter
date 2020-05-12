'use strict';

const { getLineValue, } = require('./get-gedcom-components');

const buildFmpPerson = (gedcomIndividual, personId)=> {
	const fmpPerson = {
		'Id': personId,
		'IsLiving': buildIsLiving(gedcomIndividual),
		'Gender': buildGender(gedcomIndividual),
		'DateCreated': buildDateCreated(gedcomIndividual),
		'Names': buildNames(gedcomIndividual),
		'Facts': buildFacts(gedcomIndividual),
	};

	return fmpPerson;
};

const buildIsLiving = gedcomIndividual => {
	const gedcomDeathTag = 'DEAT';
	return !gedcomIndividual.hasOwnProperty(gedcomDeathTag);
};

const buildGender = gedcomIndividual => {
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

	if (!gedcomIndividual.hasOwnProperty(gedcomSexTag)) {
		return fmpSexValues.unknown;
	}

	const gedcomSex = gedcomIndividual[gedcomSexTag][0];

	switch (getLineValue(gedcomSex.value)) {
	case gedcomSexValues.male:
		return fmpSexValues.male;
	case gedcomSexValues.female:
		return fmpSexValues.female;
	case gedcomSexValues.undetermined:
		return fmpSexValues.unknown;
	}
};

const buildDateCreated = gedcomIndividual => {
	const gedcomChangeTag = 'CHAN';
	const gedcomDateTag = 'DATE';
	const gedcomTimeTag = 'TIME';

	const gedcomDate = gedcomIndividual
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

const buildNames = gedcomIndividual => {
	const gedcomNameTag = 'NAME';
	const gedcomGivenNameTag = 'GIVN';
	const gedcomSurnameTag = 'SURN';

	const gedcomName = gedcomIndividual[gedcomNameTag][0];

	const gedcomGivenName = gedcomName[gedcomGivenNameTag][0];
	const gedcomSurname = gedcomName[gedcomSurnameTag][0];

	return [{
		'FactTypeId': 100,
		'GivenNames': getLineValue(gedcomGivenName.value),
		'Surnames': getLineValue(gedcomSurname.value),
	}, ];
};

const buildFacts = gedcomIndividual => {
	const gedcomBirthTag = 'BIRT';
	const gedcomDateTag = 'DATE';
	const gedcomPlaceTag = 'PLAC';

	if (!gedcomIndividual.hasOwnProperty(gedcomBirthTag)) {
		return [];
	}
	const gedcomBirth = gedcomIndividual[gedcomBirthTag][0];

	const birthFact = {
		'FactTypeId': 405,
		'Preferred': true,
	};

	if (gedcomBirth.hasOwnProperty(gedcomDateTag)) {
		const gedcomDate = gedcomBirth[gedcomDateTag][0];
		birthFact['DateDetail'] = getLineValue(gedcomDate.value);
	}

	if (gedcomBirth.hasOwnProperty(gedcomPlaceTag)) {
		const gedcomPlace = gedcomBirth[gedcomPlaceTag][0];
		birthFact['Place'] = {
			'PlaceName': getLineValue(gedcomPlace.value),
		};
	}

	return gedcomBirth.hasOwnProperty(gedcomDateTag)
		|| gedcomBirth.hasOwnProperty(gedcomPlaceTag)
		? [birthFact, ]
		: [];
};

module.exports =  {
	buildFmpPerson,
};