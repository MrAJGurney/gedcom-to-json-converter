'use strict';

const { parseGedcomLine, } = require('./parse-gedcom-line');

describe('parseGedcomLine', () => {
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

	describe.each(gedcomLines)('%s', (gedcomLine, expected) => {
		const actual = parseGedcomLine(gedcomLine);

		it('parses correctly', () => {
			expect(actual.level).toStrictEqual(expected.level);
			expect(actual.xrefId).toStrictEqual(expected.xrefId);
			expect(actual.tag).toStrictEqual(expected.tag);
			expect(actual.lineValue).toStrictEqual(expected.lineValue);
		});
	});
});