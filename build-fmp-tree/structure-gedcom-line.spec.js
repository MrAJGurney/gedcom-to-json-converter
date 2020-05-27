'use strict';

const {
	structureGedcomLine,
} = require('./structure-gedcom-line');

const gedcomLines = [
	[
		'0 @1234@ INDI', {
			level: 0,
			xrefId: '@1234@',
			tag: 'INDI',
			lineValue: null, },
	],
	[
		'1 AGE 13y', {
			level: 1,
			xrefId: null,
			tag: 'AGE',
			lineValue: '13y', },
	],
	[
		'1 CHIL @1234@', {
			level: 1,
			xrefId: null,
			tag: 'CHIL',
			lineValue: '@1234@',
		},
	],
	[
		'1 NOTE This is a note field that is', {
			level: 1,
			xrefId: null,
			tag: 'NOTE',
			lineValue: 'This is a note field that is',
		},
	],
	[
		'2 CONT continued on the next line.', {
			level: 2,
			xrefId: null,
			tag: 'CONT',
			lineValue: 'continued on the next line.',
		},
	],
];

describe('structureGedcomLine', () => {
	describe.each(gedcomLines)(
		'when used on \'%s\'',
		(gedcomLine, expectedStructuredLine) => {
			it('gets the correct level', () => {
				const actualStructuredLine = structureGedcomLine(gedcomLine);
				expect(expectedStructuredLine)
					.toStrictEqual(actualStructuredLine);
			});
		}
	);
});