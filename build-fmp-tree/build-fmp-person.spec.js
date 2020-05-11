'use strict';

const {
	buildFmpPerson,
	buildGender,
} = require('./build-fmp-person');

describe('buildFmpPerson', () => {
	describe('when given a structured gedcom individual', () => {
		const structuredGedcomIndividual = {
			'NAME': [
				{
					'GIVN': [
						{
							'value': '2 GIVN Gavin',
						},
					],
					'SURN': [
						{
							'value': '2 SURN Henderson',
						},
					],
					'value': '1 NAME Gavin /Henderson/',
				},
			],
			'SEX': [
				{
					'value': '1 SEX M',
				},
			],
			'BIRT': [
				{
					'DATE': [
						{
							'value': '2 DATE 1 Jan 1990',
						},
					],
					'PLAC': [
						{
							'value': '2 PLAC Dundee',
						},
					],
					'value': '1 BIRT',
				},
			],
			'CHAN': [
				{
					'DATE': [
						{
							'TIME': [
								{
									'value': '3 TIME 16:19:21',
								},
							],
							'value': '2 DATE 15 APR 2020',
						},
					],
					'value': '1 CHAN',
				},
			],
			'value': '0 @I1@ INDI',
		};

		it('builds an FMP person', () => {
			const expectedFmpPerson = {
				'IsLiving': true,
				'Gender': 1,
				'DateCreated': '2020-04-15T16:19:21',
				'Names': [
					{
						'FactTypeId': 100,
						'GivenNames': 'Gavin',
						'Surnames': 'Henderson',
					},
				],
				'Facts': [
					{
						'FactTypeId': 405,
						'DateDetail': '1 Jan 1990',
						'Place': {
							'PlaceName': 'Dundee',
						},
						'Preferred': true,
					},
				],
			};

			const actualFmpPerson = buildFmpPerson(structuredGedcomIndividual);

			expect(actualFmpPerson).toStrictEqual(expectedFmpPerson);
		});
	});
});

describe('buildGender', () => {
	const structuredGedcomIndividuals = [
		[
			{
				'SEX': [
					{
						'value': '1 SEX M',
					},
				],
				'value': '0 @I1@ INDI',
			},
			1,
		], [
			{
				'SEX': [
					{
						'value': '1 SEX F',
					},
				],
				'value': '0 @I1@ INDI',
			},
			2,
		],
		[
			{
				'SEX': [
					{
						'value': '1 SEX U',
					},
				],
				'value': '0 @I1@ INDI',
			},
			0,
		],
	];

	describe.each(structuredGedcomIndividuals)(
		'when an individual has a gedcom sex value',
		(structuredGedcomIndividual, expectedFmpGender) => {
			const actualFmpGender = buildGender(structuredGedcomIndividual);
			expect(actualFmpGender).toStrictEqual(expectedFmpGender);
		}
	);
});