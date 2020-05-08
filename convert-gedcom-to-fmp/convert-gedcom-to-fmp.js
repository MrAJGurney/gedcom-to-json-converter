'use strict';

const convertGedcomToFmp = () => {
	return {
		'Persons': [],
		'Familys': [],
		'Childs': [],
		'SourceRepos': [],
		'MasterSources': [],
		'Medias': [],
		'FactTypes': [],
	};
};

module.exports = {
	convertGedcomToFmp,
};