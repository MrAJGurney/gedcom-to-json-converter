'use strict';

const {
	structureGedcomLine,
} = require('./structure-gedcom-line');

const xrefIdCase = {
	gedcomLine: '0 @1234@ INDI',
	expectedStructuredGedcomLine: {
		level: 0,
		xrefId: '@1234@',
		tag: 'INDI',
		lineValue: null, },
};
const oneWordLineValueCase = {
	gedcomLine: '1 AGE 13y',
	expectedStructuredGedcomLine: {
		level: 1,
		xrefId: null,
		tag: 'AGE',
		lineValue: '13y', },
};

const xrefIdInLineValueCase = {
	gedcomLine: '1 CHIL @1234@',
	expectedStructuredGedcomLine: {
		level: 1,
		xrefId: null,
		tag: 'CHIL',
		lineValue: '@1234@',
	},
};
const multipleWordLineValueCase = {
	gedcomLine: '1 NOTE This is a note field that is',
	expectedStructuredGedcomLine: {
		level: 1,
		xrefId: null,
		tag: 'NOTE',
		lineValue: 'This is a note field that is',
	},
};

describe('structureGedcomLine', () => {
	describe('with a line of gedcom', () => {
		it.each([
			xrefIdCase,
			oneWordLineValueCase,
			xrefIdInLineValueCase,
			multipleWordLineValueCase,
		])('builds the expected structured gedcom', ({
			gedcomLine,
			expectedStructuredGedcomLine,
		}) => {
			const actualStructuredGedcomLine = structureGedcomLine(gedcomLine);

			expect(actualStructuredGedcomLine)
				.toStrictEqual(expectedStructuredGedcomLine);
		});
	}
	);
});