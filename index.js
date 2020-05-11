'use strict';

const { buildFmpTree, } = require('./build-fmp-tree/build-fmp-tree');
const fs = require('fs');

const main = (inputFileName, outputFileName) => {
	const gedcom = fs.readFileSync(inputFileName, 'utf8');
	const gedcomLines = gedcom.split(/(\r\n|\n\r|\r|\n)/);
	const nonEmptyGedcomLines = gedcomLines.filter(
		line => line.length>0 && /\S/.test(line)
	);

	const fmpTree = buildFmpTree(nonEmptyGedcomLines);
	const stringifiedFmpTree = JSON.stringify(fmpTree, null, 2);

	fs.unlinkSync(outputFileName);
	fs.writeFileSync(outputFileName, stringifiedFmpTree);
};

const [inputFileName, outputFileName, ] =  process.argv.slice(2);

main(inputFileName, outputFileName);