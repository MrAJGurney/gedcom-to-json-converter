'use strict';

const {
	buildFmpPerson,
} = require('./build-fmp-person');

describe('buildFmpPerson', () => {
	const gedcomIndividuals = [
		[
			{
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
						'value': '1 BIRT',
					},
				],
				'CHAN': [
					{
						'DATE': [
							{
								'TIME': [
									{
										'value': '3 TIME 16:38:50',
									},
								],
								'value': '2 DATE 15 APR 2020',
							},
						],
						'value': '1 CHAN',
					},
				],
				'value': '0 @I1@ INDI',
			},
			100,
			{
				'Id': 100,
				'IsLiving': true,
				'Gender': 1,
				'DateCreated': '2020-04-15T16:38:50',
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
						'Preferred': true,
				  },
				],
			  },
		],
		[
			{
				'NAME': [
					{
						'GIVN': [
							{
								'value': '2 GIVN Jane',
							},
						],
						'SURN': [
							{
								'value': '2 SURN Reed',
							},
						],
						'value': '1 NAME Jane /Reed/',
					},
				],
				'SEX': [
					{
						'value': '1 SEX F',
					},
				],
				'BIRT': [
					{
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
										'value': '3 TIME 16:39:15',
									},
								],
								'value': '2 DATE 15 APR 2020',
							},
						],
						'value': '1 CHAN',
					},
				],
				'value': '0 @I2@ INDI',
			},
			500,
			{
				'Id': 500,
				'IsLiving': true,
				'Gender': 2,
				'DateCreated': '2020-04-15T16:39:15',
				'Names': [
				  {
						'FactTypeId': 100,
						'GivenNames': 'Jane',
						'Surnames': 'Reed',
				  },
				],
				'Facts': [
				  {
						'FactTypeId': 405,
						'Place': {
					 		'PlaceName': 'Dundee',
						},
						'Preferred': true,
				  },
				],
			  },
		],
		[
			{
				'NAME': [
					{
						'GIVN': [
							{
								'value': '2 GIVN Frank',
							},
						],
						'SURN': [
							{
								'value': '2 SURN Henderson',
							},
						],
						'value': '1 NAME Frank /Henderson/',
					},
				],
				'SEX': [
					{
						'value': '1 SEX M',
					},
				],
				'CHAN': [
					{
						'DATE': [
							{
								'TIME': [
									{
										'value': '3 TIME 16:41:07',
									},
								],
								'value': '2 DATE 15 APR 2020',
							},
						],
						'value': '1 CHAN',
					},
				],
				'value': '0 @I3@ INDI',
			},
			24,
			{
				'Id': 24,
				'IsLiving': true,
				'Gender': 1,
				'DateCreated': '2020-04-15T16:41:07',
				'Names': [
				  {
						'FactTypeId': 100,
						'GivenNames': 'Frank',
						'Surnames': 'Henderson',
				  },
				],
				'Facts': [
					{
						'FactTypeId': 405,
						'Preferred': true,
					},
				],
			  },
		],
	];

	describe.each(gedcomIndividuals)(
		'when given a gedcom individual',
		(gedcomIndividual, fmpPersonId, expectedFmpPerson) => {
			it('builds an FMP person', () => {
				const actualFmpPerson =buildFmpPerson(
					gedcomIndividual, fmpPersonId
				);

				expect(actualFmpPerson).toStrictEqual(expectedFmpPerson);
			});
		}
	);
});