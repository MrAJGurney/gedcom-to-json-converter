'use strict';

const { parseGedcomDocument, }
	= require('./parse-gedcom-document/parse-gedcom-document');

const { buildFmpTree, }
	= require('./build-fmp-tree/build-fmp-tree');

const fs = require('fs');
const path = require('path');

const GEDCOM_FILE_EXTENSION = 'ged';
const JSON_FILE_EXTENSION = 'json';

const gedcomToJsonConverter = folder => {
	const files = fs.readdirSync(folder);
	const gedcomFiles = files.filter(file => {
		const fileExtension = file.split('.').slice(-1)[0];
		return fileExtension.toLowerCase() === GEDCOM_FILE_EXTENSION;
	});

	gedcomFiles.forEach(gedcomFileName => {
		const treeFileName = gedcomFileName
			.split('.')
			.slice(0, -1)
			.concat([JSON_FILE_EXTENSION, ])
			.join('.');

		const gedcomFilePath = path.join(folder, gedcomFileName);
		const treeFilePath = path.join(folder, treeFileName);

		const gedcomDocument = fs.readFileSync(gedcomFilePath, 'utf8');
		const structuredGedcom = parseGedcomDocument(gedcomDocument);
		const fmpTree = buildFmpTree(structuredGedcom);

		const stringifiedFmpTree = JSON.stringify(fmpTree, null, 2);
		fs.writeFileSync(treeFilePath, stringifiedFmpTree);
	});
};

module.exports = {
	gedcomToJsonConverter,
};