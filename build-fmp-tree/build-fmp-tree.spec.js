'use strict';

const { buildFmpTree, } = require('./build-fmp-tree');

describe('buildFmpTree', () => {
	describe('when an empty collection of gedcom lines are passed', () => {
		const gedcomLines = [];

		it('returns an empty FMP tree', () => {
			const expectedFmpTree = {
				'Persons': [],
				'Familys': [],
				'Childs': [],
				'SourceRepos': [],
				'MasterSources': [],
				'Medias': [],
				'FactTypes': [],
			};

			const actualFmpTree = buildFmpTree(gedcomLines);

			expect(actualFmpTree).toStrictEqual(expectedFmpTree);
		});
	});

	describe('when one node gedcom text is parsed', () => {
		const gedcomLines = [
			'0 HEAD',
			'1 SOUR FINDMYPAST',
			'2 NAME Findmypast Family Tree',
			'2 VERS 2.0',
			'2 CORP DC Thomson Family History',
			'3 ADDR The Glebe, 6 Chapel Place, Rivington Street',
			'4 CITY London',
			'4 POST EC2A 3DQ',
			'4 CTRY England',
			'3 WWW www.findmypast.com',
			'1 DATE 15 APR 2020',
			'2 TIME 15:21:24',
			'1 FILE Henderson Family Tree.ged',
			'1 SUBM @SUBM1@',
			'1 DEST FINDMYPAST',
			'1 GEDC',
			'2 VERS 5.5.1',
			'2 FORM LINEAGE-LINKED',
			'1 CHAR UTF-8',
			'1 LANG English',
			'1 _ROOT @I1@',
			'0 @SUBM1@ SUBM',
			'1 NAME Not known',
			'0 @I1@ INDI',
			'1 NAME Gavin /Henderson/',
			'2 GIVN Gavin',
			'2 SURN Henderson',
			'2 _PRIM Y',
			'1 SEX M',
			'1 BIRT',
			'2 _PRIM Y',
			'2 DATE 1 Jan 1990',
			'2 PLAC Dundee',
			'1 _UID 9ACF01CA-A40C-4AF5-8905-D6678B6288BE',
			'1 CHAN',
			'2 DATE 15 APR 2020',
			'3 TIME 16:19:21',
			'0 TRLR',
		];

		const actualFmpTree = buildFmpTree(gedcomLines);

		it('constructs the expected FMP tree', () => {
			const expectedFmpTree = {
				'Persons': [
				  {
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
				  },
				],
				'Familys': [],
				'Childs': [],
				'SourceRepos': [],
				'MasterSources': [],
				'Medias': [],
				'FactTypes': [],
			  };

			expect(actualFmpTree).toMatchObject(expectedFmpTree);
		});

		it('constructs a person with an id which is a number', () => {
			expect(typeof actualFmpTree.Persons[0].Id).toStrictEqual('number');
		});
	});
});

