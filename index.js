'use strict';

const { parseGedcomDocument, }
	= require('./parse-gedcom-document/parse-gedcom-document');

const { buildFmpTree, }
	= require('./build-fmp-tree/build-fmp-tree');

const fs = require('fs');

const main = (inputFileName, outputFileName) => {
	const gedcomDocument = fs.readFileSync(inputFileName, 'utf8');

	const structuredGedcom = parseGedcomDocument(gedcomDocument);

	const fmpTree = buildFmpTree(structuredGedcom);

	const stringifiedFmpTree = JSON.stringify(fmpTree, null, 2);
	fs.unlinkSync(outputFileName);
	fs.writeFileSync(outputFileName, stringifiedFmpTree);
};

const [inputFileName, outputFileName, ] =  process.argv.slice(2);

main(inputFileName, outputFileName);