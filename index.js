'use strict';

const { gedcomToJsonConverter, }
	= require('./gedcom-to-json-converter/gedcom-to-json-converter.js');

const [folder, ] = process.argv.slice(2);

gedcomToJsonConverter(folder);