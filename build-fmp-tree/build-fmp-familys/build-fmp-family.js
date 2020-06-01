'use strict';

const { buildFmpDateCreated, } = require('../build-fmp-date-created');

const buildFmpFamily = (gedcomFamily, personsIds, familyId) => {
	const fmpFamily = {
		Id: familyId,
		DateCreated: buildFmpDateCreated(gedcomFamily),
		MotherId: personsIds[gedcomFamily['WIFE'][0].value.lineValue],
		FatherId: personsIds[gedcomFamily['HUSB'][0].value.lineValue],
	};

	return fmpFamily;
};

module.exports = {
	buildFmpFamily,
};