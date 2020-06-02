'use strict';

const { splitGedcom, } = require('./split-gedcom');

describe('splitGedcom', () => {
	const generateGedcomDocumentWithLineSeperator = lineSeperator => {
		return [
			'',
			'0 HEAD',
			'1 SOUR FINDMYPAST',
			'',
			'2 NAME Findmypast Family Tree',
			'',
			'2 VERS 2.0',
			'',
			'',
		].join(lineSeperator);
	};

	const expectedLines = [
		'0 HEAD',
		'1 SOUR FINDMYPAST',
		'2 NAME Findmypast Family Tree',
		'2 VERS 2.0',
	];

	describe('with a gedcom document', () => {
		it.each([
			{ lineSeperator: '\n', },
			{ lineSeperator: '\r', },
			{ lineSeperator: '\n\r', },
			{ lineSeperator: '\r\n', },
		])(
			'builds the expected collection of non empty lines',
			({ lineSeperator, }) => {
				const gedcomDocument
					= generateGedcomDocumentWithLineSeperator(lineSeperator);

				const actualLines = splitGedcom(gedcomDocument);

				expect(actualLines).toStrictEqual(expectedLines);
			}
		);
	});
});

