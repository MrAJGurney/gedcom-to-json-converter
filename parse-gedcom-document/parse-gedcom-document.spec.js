'use strict';

const { parseGedcomDocument, } = require('./parse-gedcom-document');

describe('parseGedcomDocument', () => {
	const validDocumentCase = {
		gedcomDocument: [
			'',
			'0 HEAD',
			'0 @I1@ INDI',
			'',
			'1 NAME Reg /Oyce/',
			'2 GIVN Reg',
			'2 SURN Oyce',
			'1 SEX M',
			'1 BIRT',
			'2 DATE 1 Jan 1990',
			'',
			'0 TRLR',
			'',
			'',
			'',
		].join('\r\n'),
		expectedStructuredGedcom: {
			HEAD: [
				{
					value: {
						level: 0,
						xrefId: null,
						tag: 'HEAD',
						lineValue: null,
					},
				},
			],
			INDI: [
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'GIVN',
										lineValue: 'Reg',
									},
								},
							],
							SURN: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'SURN',
										lineValue: 'Oyce',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'NAME',
								lineValue: 'Reg /Oyce/',
							},
						},
					],
					SEX: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'SEX',
								lineValue: 'M',
							},
						},
					],
					BIRT: [
						{
							DATE: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'DATE',
										lineValue: '1 Jan 1990',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'BIRT',
								lineValue: null,
							},
						},
					],
					value: {
						level: 0,
						xrefId: '@I1@',
						tag: 'INDI',
						lineValue: null,
					},
				},
			],
			TRLR: [
				{
					value: {
						level: 0,
						xrefId: null,
						tag: 'TRLR',
						lineValue: null,
					},
				},
			],
		},
	};

	describe('with a gedcom document', () => {
		it.each([
			validDocumentCase,
		])('builds the expected structured gedcom', ({
			gedcomDocument,
			expectedStructuredGedcom,
		}) => {
			const actualStructuredGedcom = parseGedcomDocument(gedcomDocument);

			expect(actualStructuredGedcom)
				.toStrictEqual(expectedStructuredGedcom);
		});
	});
});