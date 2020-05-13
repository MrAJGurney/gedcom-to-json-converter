'use strict';

const { buildFmpTree, } = require('./build-fmp-tree/build-fmp-tree');
const { splitGedcom, } = require('./build-fmp-tree/split-gedcom');
const fs = require('fs');

const main = (inputFileName, outputFileName) => {
	const gedcom = fs.readFileSync(inputFileName, 'utf8');
	const gedcomLines = splitGedcom(gedcom);
	const fmpTree = buildFmpTree(gedcomLines);
	const stringifiedFmpTree = JSON.stringify(fmpTree, null, 2);
	fs.unlinkSync(outputFileName);
	fs.writeFileSync(outputFileName, stringifiedFmpTree);
};

const [inputFileName, outputFileName, ] =  process.argv.slice(2);

main(inputFileName, outputFileName);