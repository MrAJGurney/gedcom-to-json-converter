'use strict';

const { buildFmpFamily, } = require('./build-fmp-family');

describe('buildFmpFamily', () => {
	const structuredGedcoms = [
		[
			{
				'HUSB': [{
					'value': {
						'level': 1,
						'lineValue': '@I1@',
						'tag': 'HUSB',
						'xrefId': null,
					},
				}, ],
				'WIFE': [{
					'value': {
						'level': 1,
						'lineValue': '@I2@',
						'tag': 'WIFE',
						'xrefId': null,
					},
				}, ],
				'CHAN': [{
					'DATE': [{
						'TIME': [{
							'value': {
								'level': 3,
								'lineValue': '16:43:01',
								'tag': 'TIME',
								'xrefId': null,
							},
						}, ],
						'value': {
							'level': 2,
							'lineValue': '15 APR 2020',
							'tag': 'DATE',
							'xrefId': null,
						},
					}, ],
					'value': {
						'level': 1,
						'lineValue': null,
						'tag': 'CHAN',
						'xrefId': null,
					},
				}, ],
			},
			{
				'@I1@': 1000000000,
				'@I2@': 1000000001,
			},
			-1,
			{
				'Id': -1,
				'DateCreated': '2020-04-15T16:43:01',
				'MotherId': 1000000001,
				'FatherId': 1000000000,
			},
		],
		[
			{
				'HUSB': [{
					'value': {
						'level': 1,
						'lineValue': '@I3@',
						'tag': 'HUSB',
						'xrefId': null,
					},
				}, ],
				'WIFE': [{
					'value': {
						'level': 1,
						'lineValue': '@I2@',
						'tag': 'WIFE',
						'xrefId': null,
					},
				}, ],
				'CHIL': [
					{
						'value': {
							'level': 1,
							'lineValue': '@I1@',
							'tag': 'CHIL',
							'xrefId': null,
						},
					},
					{
						'value': {
							'level': 1,
							'lineValue': '@I4@',
							'tag': 'CHIL',
							'xrefId': null,
						},
					},
				],
				'CHAN': [{
					'DATE': [{
						'TIME': [{
							'value': {
								'level': 3,
								'lineValue': '16:43:01',
								'tag': 'TIME',
								'xrefId': null,
							},
						}, ],
						'value': {
							'level': 2,
							'lineValue': '15 APR 2020',
							'tag': 'DATE',
							'xrefId': null,
						},
					}, ],
					'value': {
						'level': 1,
						'lineValue': null,
						'tag': 'CHAN',
						'xrefId': null,
					},
				}, ],
			},
			{
				'@I1@': 1000000000,
				'@I2@': 1000000001,
				'@I3@': 1000000002,
				'@I4@': 1000000003,
			},
			-1,
			{
				'Id': -1,
				'DateCreated': '2020-04-15T16:43:01',
				'MotherId': 1000000001,
				'FatherId': 1000000002,
			},
		],
	];

	describe('when given structured gedcom', () => {
		it.each(structuredGedcoms)(
			'builds the family and children ',
			(
				structuredGedcom,
				fmpPersonsIds,
				familyId,
				expectedFamily
			) => {
				const actualFamily = buildFmpFamily(
					structuredGedcom,
					fmpPersonsIds,
					familyId
				);

				expect(actualFamily).toStrictEqual(expectedFamily);
			}
		);
	});
});

