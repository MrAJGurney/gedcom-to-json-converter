'use strict';

const buildFmpTreeFromGedcom = () => {
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
	buildFmpTreeFromGedcom,
};