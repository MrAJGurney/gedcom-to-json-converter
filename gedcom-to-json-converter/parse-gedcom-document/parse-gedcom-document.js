'use strict';

const { splitGedcomLines, } = require('./split-gedcom-lines');
const { buildStructuredGedcom, } = require('./build-structured-gedcom');

const parseGedcomDocument = gedcomDocument => {
	const gedcomLines = splitGedcomLines(gedcomDocument);
	const structuredGedcom = buildStructuredGedcom(gedcomLines);
	return structuredGedcom;
};

module.exports = {
	parseGedcomDocument,
};