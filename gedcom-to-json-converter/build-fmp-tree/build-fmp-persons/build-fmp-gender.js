'use strict';

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

const buildFmpGender = gedcom => {
	if (!gedcom.hasOwnProperty(gedcomSexTag)) {
		return fmpSexValues.unknown;
	}

	const gedcomSex = gedcom[gedcomSexTag][0];

	switch (gedcomSex.value.lineValue) {
	case gedcomSexValues.male:
		return fmpSexValues.male;
	case gedcomSexValues.female:
		return fmpSexValues.female;
	case gedcomSexValues.undetermined:
		return fmpSexValues.unknown;
	}
};

module.exports =  {
	buildFmpGender,
};