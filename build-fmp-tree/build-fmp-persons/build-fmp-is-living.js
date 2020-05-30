'use strict';

const gedcomDeathTag = 'DEAT';

const buildFmpIsLiving = structuredGedcom => {
	return !structuredGedcom.hasOwnProperty(gedcomDeathTag);
};

module.exports =  {
	buildFmpIsLiving,
};