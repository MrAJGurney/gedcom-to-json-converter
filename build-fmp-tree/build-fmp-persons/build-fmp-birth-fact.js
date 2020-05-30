'use strict';

const gedcomBirthTag = 'BIRT';
const gedcomDateTag = 'DATE';
const gedcomPlaceTag = 'PLAC';

const buildFmpBirthFact = structuredGedcom => {
	const birthFact = {
		'FactTypeId': 405,
		'Preferred': true,
	};

	if (!structuredGedcom.hasOwnProperty(gedcomBirthTag)) {
		return birthFact;
	}

	const gedcomBirth = structuredGedcom[gedcomBirthTag][0];

	if (gedcomBirth.hasOwnProperty(gedcomDateTag)) {
		const gedcomDate = gedcomBirth[gedcomDateTag][0];
		birthFact['DateDetail'] = gedcomDate.value.lineValue;
	}

	if (gedcomBirth.hasOwnProperty(gedcomPlaceTag)) {
		const gedcomPlace = gedcomBirth[gedcomPlaceTag][0];
		birthFact['Place'] = {
			'PlaceName': gedcomPlace.value.lineValue,
		};
	}

	return birthFact;
};

module.exports = {
	buildFmpBirthFact,
};