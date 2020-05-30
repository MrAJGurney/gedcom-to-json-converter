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
								'value': {
									'level': 2,
									'lineValue': 'Gavin',
									'tag': 'GIVN',
									'xrefId': null,
								},
							},
						],
						'SURN': [
							{
								'value': {
									'level': 2,
									'lineValue': 'Henderson',
									'tag': 'SURN',
									'xrefId': null,
								},
							},
						],
						'value': {
							'level': 1,
							'lineValue': 'Gavin /Henderson/',
							'tag': 'NAME',
							'xrefId': null,
						},
					},
				],
				'SEX': [
					{
						'value': {
							'level': 1,
							'lineValue': 'M',
							'tag': 'SEX',
							'xrefId': null,
						},
					},
				],
				'BIRT': [
					{
						'DATE': [
							{
								'value': {
									'level': 2,
									'lineValue': '1 Jan 1990',
									'tag': 'DATE',
									'xrefId': null,
								},
							},
						],
						'value': {
							'level': 1,
							'lineValue': null,
							'tag': 'BIRT',
							'xrefId': null,
						},
					},
				],
				'CHAN': [
					{
						'DATE': [
							{
								'TIME': [
									{
										'value': {
											'level': 3,
											'lineValue': '16:38:50',
											'tag': 'TIME',
											'xrefId': null,
										},
									},
								],
								'value': {
									'level': 2,
									'lineValue': '15 APR 2020',
									'tag': 'DATE',
									'xrefId': null,
								},
							},
						],
						'value': {
							'level': 1,
							'lineValue': null,
							'tag': 'CHAN',
							'xrefId': null,
						},
					},
				],
				'value': {
					'level': 0,
					'lineValue': null,
					'tag': 'INDI',
					'xrefId': '@I1@',
				},
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
								'value': {
									'level': 2,
									'lineValue': 'Jane',
									'tag': 'GIVN',
									'xrefId': null,
								},
							},
						],
						'SURN': [
							{
								'value': {
									'level': 2,
									'lineValue': 'Reed',
									'tag': 'SURN',
									'xrefId': null,
								},
							},
						],
						'value': {
							'level': 1,
							'lineValue': 'Jane /Reed/',
							'tag': 'NAME',
							'xrefId': null,
						},
					},
				],
				'SEX': [
					{
						'value': {
							'level': 1,
							'lineValue': 'F',
							'tag': 'SEX',
							'xrefId': null,
						},
					},
				],
				'BIRT': [
					{
						'PLAC': [
							{
								'value': {
									'level': 2,
									'lineValue': 'Dundee',
									'tag': 'PLAC',
									'xrefId': null,
								},
							},
						],
						'value': {
							'level': 1,
							'lineValue': null,
							'tag': 'BIRT',
							'xrefId': null,
						},
					},
				],
				'CHAN': [
					{
						'DATE': [
							{
								'TIME': [
									{
										'value': {
											'level': 3,
											'lineValue': '16:39:15',
											'tag': 'TIME',
											'xrefId': null,
										},
									},
								],
								'value': {
									'level': 2,
									'lineValue': '15 APR 2020',
									'tag': 'DATE',
									'xrefId': null,
								},
							},
						],
						'value': {
							'level': 1,
							'lineValue': null,
							'tag': 'CHAN',
							'xrefId': null,
						},
					},
				],
				'value': {
					'level': 0,
					'lineValue': '@I2@',
					'tag': 'INDI',
					'xrefId': null,
				},
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
								'value': {
									'level': 2,
									'lineValue': 'Frank',
									'tag': 'GIVN',
									'xrefId': null,
								},
							},
						],
						'SURN': [
							{
								'value': {
									'level': 2,
									'lineValue': 'Henderson',
									'tag': 'SURN',
									'xrefId': null,
								},
							},
						],
						'value': {
							'level': 1,
							'lineValue': 'Frank /Henderson/',
							'tag': 'NAME',
							'xrefId': null,
						},
					},
				],
				'SEX': [
					{
						'value': {
							'level': 1,
							'lineValue': 'M',
							'tag': 'SEX',
							'xrefId': null,
						},
					},
				],
				'CHAN': [
					{
						'DATE': [
							{
								'TIME': [
									{
										'value': {
											'level': 3,
											'lineValue': '16:41:07',
											'tag': 'TIME',
											'xrefId': null,
										},
									},
								],
								'value': {
									'level': 2,
									'lineValue': '15 APR 2020',
									'tag': 'DATE',
									'xrefId': null,
								},
							},
						],
						'value': {
							'level': 1,
							'lineValue': null,
							'tag': 'CHAN',
							'xrefId': null,
						},
					},
				],
				'value': {
					'level': 0,
					'lineValue': null,
					'tag': 'INDI',
					'xrefId': '@I3@',
				},
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