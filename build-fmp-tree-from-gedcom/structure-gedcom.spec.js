'use strict';

const { structureGedcom, } = require('./structure-gedcom');

describe('structureGedcom', () => {
	describe('when given simple gedcom lines', () => {
		it('structures the gedcom', () => {
			const gedcomLines = [
				'0 HEAD',
				'0 @I1@ INDI',
			];
			const expectedStructuredGedcom = {
				'HEAD': [{
					'value': '0 HEAD',
				}, ],
				'INDI': [{
					'value': '0 @I1@ INDI',
				}, ],
			};

			const actualStructuredGedcom = structureGedcom(gedcomLines);

			expect(actualStructuredGedcom)
				.toStrictEqual(expectedStructuredGedcom);
		});
	});

	describe('when given gedcom lines with duplicate tag types', () => {
		it('structures the gedcom', () => {
			const gedcomLines = [
				'0 HEAD',
				'0 @I1@ INDI',
				'0 @I2@ INDI',
			];
			const expectedStructuredGedcom = {
				'HEAD': [{
					'value': '0 HEAD',
				}, ],
				'INDI': [{
					'value': '0 @I1@ INDI',
				}, {
					'value': '0 @I2@ INDI',
				}, ],

			};

			const actualStructuredGedcom = structureGedcom(gedcomLines);

			expect(actualStructuredGedcom)
				.toStrictEqual(expectedStructuredGedcom);
		});
	});
});