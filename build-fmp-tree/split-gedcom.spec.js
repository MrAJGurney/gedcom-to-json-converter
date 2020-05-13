'use strict';

const { splitGedcom, } = require('./split-gedcom');

describe('splitGedcom', () => {
	const gedcomFilesContents    = [
		[
			[
				'',
				'0 HEAD',
				'1 SOUR FINDMYPAST',
				'',
				'2 NAME Findmypast Family Tree',
				'',
				'2 VERS 2.0',
				'',
				'',
			].join('\n'),
			[
				'0 HEAD',
				'1 SOUR FINDMYPAST',
				'2 NAME Findmypast Family Tree',
				'2 VERS 2.0',
			],
		],
		[
			[
				'',
				'0 HEAD',
				'1 SOUR FINDMYPAST',
				'',
				'2 NAME Findmypast Family Tree',
				'',
				'2 VERS 2.0',
				'',
				'',
			].join('\r'),
			[
				'0 HEAD',
				'1 SOUR FINDMYPAST',
				'2 NAME Findmypast Family Tree',
				'2 VERS 2.0',
			],
		],
		[
			[
				'',
				'0 HEAD',
				'1 SOUR FINDMYPAST',
				'',
				'2 NAME Findmypast Family Tree',
				'',
				'2 VERS 2.0',
				'',
				'',
			].join('\n\r'),
			[
				'0 HEAD',
				'1 SOUR FINDMYPAST',
				'2 NAME Findmypast Family Tree',
				'2 VERS 2.0',
			],
		],
		[
			[
				'',
				'0 HEAD',
				'1 SOUR FINDMYPAST',
				'',
				'2 NAME Findmypast Family Tree',
				'',
				'2 VERS 2.0',
				'',
				'',
			].join('\r\n'),
			[
				'0 HEAD',
				'1 SOUR FINDMYPAST',
				'2 NAME Findmypast Family Tree',
				'2 VERS 2.0',
			],
		],
	];

	describe('when given gedcom file contents', () => {
		it.each(gedcomFilesContents)(
			'splits the gedcom by line',
			(gedcomFileContents, expectedGedcomLines) => {
				const actualGedcomLines = splitGedcom(gedcomFileContents);

				expect(actualGedcomLines).toStrictEqual(expectedGedcomLines);
			}
		);
	});
});

