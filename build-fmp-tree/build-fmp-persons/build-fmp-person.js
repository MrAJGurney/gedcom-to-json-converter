'use strict';

const { buildFmpIsLiving, } = require('./build-fmp-is-living');
const { buildFmpGender, } = require('./build-fmp-gender');
const { buildFmpDateCreated, } = require('../build-fmp-date-created');
const { buildFmpNameFact, } = require('./build-fmp-name-fact');
const { buildFmpBirthFact, } = require('./build-fmp-birth-fact');

const buildFmpPerson = (gedcomIndividual, personId)=> {
	const fmpPerson = {
		'Id': personId,
		'IsLiving': buildFmpIsLiving(gedcomIndividual),
		'Gender': buildFmpGender(gedcomIndividual),
		'DateCreated': buildFmpDateCreated(gedcomIndividual),
		'Names': buildNames(gedcomIndividual),
		'Facts': buildFacts(gedcomIndividual),
	};

	return fmpPerson;
};

const buildNames = gedcomIndividual => {
	return [
		buildFmpNameFact(gedcomIndividual),
	];
};

const buildFacts = gedcomIndividual => {
	return [
		buildFmpBirthFact(gedcomIndividual),
	];
};

module.exports =  {
	buildFmpPerson,
};