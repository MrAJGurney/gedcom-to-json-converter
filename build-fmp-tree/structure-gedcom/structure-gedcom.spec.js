'use strict';

const { structureGedcom, } = require('./structure-gedcom');

describe('structureGedcom', () => {
	const simpleGedcomCase = {
		gedcomLines: [
			'0 HEAD',
			'0 @I1@ INDI',
		],
		expectedStructuredGedcom: {
			HEAD: [{
				value: {
					level: 0,
					lineValue: null,
					tag: 'HEAD',
					xrefId: null,
				},
			}, ],
			INDI: [{
				value: {
					level: 0,
					lineValue: null,
					tag: 'INDI',
					xrefId: '@I1@',
				},
			}, ],
		},
	};

	const multipleInstancesOfTagCase = {
		gedcomLines: [
			'0 HEAD',
			'0 @I1@ INDI',
			'0 @I2@ INDI',
		],
		expectedStructuredGedcom: {
			HEAD: [{
				value: {
					level: 0,
					lineValue: null,
					tag: 'HEAD',
					xrefId: null,
				},
			}, ],
			INDI: [{
				value: {
					level: 0,
					lineValue: null,
					tag: 'INDI',
					xrefId: '@I1@',
				},
			}, {
				value: {
					level: 0,
					lineValue: null,
					tag: 'INDI',
					xrefId: '@I2@',
				},
			}, ],
		},
	};

	const hierarchicalCase = {
		gedcomLines: [
			'0 HEAD',
			'0 @I2@ INDI',
			'1 NAME Jane /Doe/',
		],
		expectedStructuredGedcom: {
			HEAD: [{
				value: {
					level: 0,
					lineValue: null,
					tag: 'HEAD',
					xrefId: null,
				},
			}, ],
			INDI: [{
				value: {
					level: 0,
					lineValue: null,
					tag: 'INDI',
					xrefId: '@I2@',

				},
				NAME: [{
					value: {
						level: 1,
						lineValue: 'Jane /Doe/',
						tag: 'NAME',
						xrefId: null,
					},
				}, ],
			}, ],
		},
	};

	const hierarchicalAndMultipleInstancesOfTagCase = {
		gedcomLines: [
			'0 HEAD',
			'0 @I1@ INDI',
			'0 @I2@ INDI',
			'1 NAME Jane /Doe/',
			'2 GIVN Jane',
			'0 @I3@ INDI',
			'1 NAME John /Smith/',
			'2 GIVN John',
			'2 SURN Smith',
		],
		expectedStructuredGedcom: {
			HEAD: [{
				value: {
					level: 0,
					lineValue: null,
					tag: 'HEAD',
					xrefId: null,
				},
			}, ],
			INDI: [{
				value: {
					level: 0,
					lineValue: null,
					tag: 'INDI',
					xrefId: '@I1@',

				},
			}, {
				value: {
					level: 0,
					lineValue: null,
					tag: 'INDI',
					xrefId: '@I2@',
				},

				NAME: [{
					value: {
						level: 1,
						lineValue: 'Jane /Doe/',
						tag: 'NAME',

						xrefId: null,
					},
					GIVN: [{
						value: {
							level: 2,
							lineValue: 'Jane',
							tag: 'GIVN',

							xrefId: null,
						},
					}, ],
				}, ],
			}, {
				value: {
					level: 0,
					lineValue: null,
					tag: 'INDI',
					xrefId: '@I3@',
				},
				NAME: [{
					value: {
						level: 1,
						lineValue: 'John /Smith/',
						tag: 'NAME',
						xrefId: null,
					},
					GIVN: [{
						value: {
							level: 2,
							lineValue: 'John',
							tag: 'GIVN',

							xrefId: null,
						},
					}, ],
					SURN: [{
						value: {
							level: 2,
							lineValue: 'Smith',
							tag: 'SURN',

							xrefId: null,
						},
					}, ],
				}, ],
			}, ],
		},
	};

	describe('with an array of gedcom lines', () => {
		it.each([
			simpleGedcomCase,
			multipleInstancesOfTagCase,
			hierarchicalCase,
			hierarchicalAndMultipleInstancesOfTagCase,
		])('builds the expected structured gedcom', ({
			gedcomLines,
			expectedStructuredGedcom,
		}) => {
			const actualStructuredGedcom = structureGedcom(gedcomLines);

			expect(actualStructuredGedcom)
				.toStrictEqual(expectedStructuredGedcom);
		});
	});
});