'use strict';

const { getLineValue, } = require('./get-gedcom-components');

const gedcomNameTag = 'NAME';
const gedcomGivenNameTag = 'GIVN';
const gedcomSurnameTag = 'SURN';

const buildFmpNameFact = structuredGedcom => {
	const gedcomName = structuredGedcom[gedcomNameTag][0];

	const gedcomGivenName = gedcomName[gedcomGivenNameTag][0];
	const gedcomSurname = gedcomName[gedcomSurnameTag][0];

	return {
		'FactTypeId': 100,
		'GivenNames': getLineValue(gedcomGivenName.value),
		'Surnames': getLineValue(gedcomSurname.value),
	};
};

module.exports =  {
	buildFmpNameFact,
};