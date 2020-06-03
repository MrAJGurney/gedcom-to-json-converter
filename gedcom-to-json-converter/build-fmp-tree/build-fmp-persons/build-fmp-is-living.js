'use strict';

const gedcomDeathTag = 'DEAT';

const buildFmpIsLiving = gedcomPerson => {
	return !gedcomPerson.hasOwnProperty(gedcomDeathTag);
};

module.exports =  {
	buildFmpIsLiving,
};