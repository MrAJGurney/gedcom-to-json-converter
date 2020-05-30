'use strict';

const { buildFmpDateCreated, } = require('../build-fmp-date-created');

const buildFmpFamily = (gedcomFamily, fmpPersonsIds, familyId) => {
	const fmpFamily = {
		'Id': familyId,
		'DateCreated': buildFmpDateCreated(gedcomFamily),
		'MotherId': fmpPersonsIds[gedcomFamily['WIFE'][0].value.lineValue],
		'FatherId': fmpPersonsIds[gedcomFamily['HUSB'][0].value.lineValue],
	};

	return fmpFamily;
};

module.exports = {
	buildFmpFamily,
};