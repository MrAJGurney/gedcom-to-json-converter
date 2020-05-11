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

	describe('when given gedcom lines with a hierarchy', () => {
		it('structures the gedcom', () => {
			const gedcomLines = [
				'0 HEAD',
				'0 @I2@ INDI',
				'1 NAME Jane /Doe/',
			];
			const expectedStructuredGedcom = {
				'HEAD': [{
					'value': '0 HEAD',
				}, ],
				'INDI': [{
					'value': '0 @I2@ INDI',
					'NAME': [{
						'value': '1 NAME Jane /Doe/',
					}, ],
				}, ],
			};

			const actualStructuredGedcom = structureGedcom(gedcomLines);

			expect(actualStructuredGedcom)
				.toMatchObject(expectedStructuredGedcom);
		});
	});

	describe(
		'when given gedcom lines with duplicate tag types and a hierarchy',
		() => {
			it('structures the gedcom', () => {
				const gedcomLines = [
					'0 HEAD',
					'0 @I1@ INDI',
					'0 @I2@ INDI',
					'1 NAME Jane /Doe/',
					'2 GIVN Jane',
					'0 @I3@ INDI',
					'1 NAME John /Smith/',
					'2 GIVN John',
					'2 SURN Smith',
				];
				const expectedStructuredGedcom = {
					'HEAD': [{
						'value': '0 HEAD',
					}, ],
					'INDI': [{
						'value': '0 @I1@ INDI',
					}, {
						'value': '0 @I2@ INDI',
						'NAME': [{
							'value': '1 NAME Jane /Doe/',
							'GIVN': [{
								'value': '2 GIVN Jane',
							}, ],
						}, ],
					}, {
						'value': '0 @I3@ INDI',
						'NAME': [{
							'value': '1 NAME John /Smith/',
							'GIVN': [{
								'value': '2 GIVN John',
							}, ],
							'SURN': [{
								'value': '2 SURN Smith',
							}, ],
						}, ],
					}, ],
				};

				const actualStructuredGedcom = structureGedcom(gedcomLines);

				expect(actualStructuredGedcom)
					.toMatchObject(expectedStructuredGedcom);
			});
		}
	);
});