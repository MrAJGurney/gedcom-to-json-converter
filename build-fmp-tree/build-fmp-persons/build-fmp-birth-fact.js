'use strict';

const gedcomBirthTag = 'BIRT';
const gedcomDateTag = 'DATE';
const gedcomPlaceTag = 'PLAC';

const fmpBirthFactTypeId = 405;

const buildFmpBirthFact = gedcomPerson => {
	const birthFact = {
		FactTypeId: fmpBirthFactTypeId,
		Preferred: true,
	};

	if (!gedcomPerson.hasOwnProperty(gedcomBirthTag)) {
		return birthFact;
	}

	const gedcomBirth = gedcomPerson[gedcomBirthTag][0];

	if (gedcomBirth.hasOwnProperty(gedcomDateTag)) {
		const gedcomDate = gedcomBirth[gedcomDateTag][0];
		birthFact['DateDetail'] = gedcomDate.value.lineValue;
	}

	if (gedcomBirth.hasOwnProperty(gedcomPlaceTag)) {
		const gedcomPlace = gedcomBirth[gedcomPlaceTag][0];
		birthFact['Place'] = {
			PlaceName: gedcomPlace.value.lineValue,
		};
	}

	return birthFact;
};

module.exports = {
	buildFmpBirthFact,
};