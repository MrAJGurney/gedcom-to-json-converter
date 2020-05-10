'use strict';

const {
	getLevel,
	getXrefId,
	getTag,
	getLineValue,
} = require('./get-gedcom-components');

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

describe('getLevel', () => {
	describe.each(gedcomLines)(
		'when used on \'%s\'',
		(gedcomLine, expected) => {
			it('gets the correct level', () => {
				const expectedLevel = expected.level;
				const actualLevel = getLevel(gedcomLine);
				expect(expectedLevel).toStrictEqual(actualLevel);
			});
		}
	);
});

describe('getXrefId', () => {
	describe.each(gedcomLines)(
		'when used on \'%s\'',
		(gedcomLine, expected) => {
			it('gets the correct xref ID', () => {
				const expectedXrefId = expected.xrefId;
				const actualXrefId = getXrefId(gedcomLine);
				expect(expectedXrefId).toStrictEqual(actualXrefId);
			});
		}
	);
});

describe('getTag', () => {
	describe.each(gedcomLines)(
		'when used on \'%s\'',
		(gedcomLine, expected) => {
			it('gets the correct tag', () => {
				const expectedTag = expected.tag;
				const actualTag = getTag(gedcomLine);
				expect(expectedTag).toStrictEqual(actualTag);
			});
		}
	);
});

describe('getLineValue', () => {
	describe.each(gedcomLines)(
		'when used on \'%s\'',
		(gedcomLine, expected) => {
			it('gets the correct line value', () => {
				const expectedLineValue = expected.lineValue;
				const actualLineValue = getLineValue(gedcomLine);
				expect(expectedLineValue).toStrictEqual(actualLineValue);
			});
		}
	);
});