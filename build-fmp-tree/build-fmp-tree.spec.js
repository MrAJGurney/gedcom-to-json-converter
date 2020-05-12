'use strict';

const { buildFmpTree, } = require('./build-fmp-tree');

describe('buildFmpTree', () => {
	const gedcoms = [
		[
			[
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
			],
			{
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
			  },
		],
		[
			[
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
				'2 TIME 15:41:30',
				'1 FILE Three Node.ged',
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
				'1 FAMC @F1@',
				'1 _UID 51F43EFB-1533-430B-968F-D8FAFEC27D46',
				'1 CHAN',
				'2 DATE 15 APR 2020',
				'3 TIME 16:38:50',
				'0 @I2@ INDI',
				'1 NAME Jane /Reed/',
				'2 GIVN Jane',
				'2 SURN Reed',
				'2 _PRIM Y',
				'1 SEX F',
				'1 BIRT',
				'2 _PRIM Y',
				'2 PLAC Dundee',
				'1 FAMS @F1@',
				'1 _UID 15D52256-05FD-48F9-A5B5-D1571D570DCE',
				'1 CHAN',
				'2 DATE 15 APR 2020',
				'3 TIME 16:39:15',
				'0 @I3@ INDI',
				'1 NAME Frank /Henderson/',
				'2 GIVN Frank',
				'2 SURN Henderson',
				'2 _PRIM Y',
				'1 SEX M',
				'1 FAMS @F1@',
				'1 _UID 5B6AA0D6-1F76-4C4D-8F07-FF7D1F80B5D7',
				'1 CHAN',
				'2 DATE 15 APR 2020',
				'3 TIME 16:41:07',
				'0 @F1@ FAM',
				'1 HUSB @I3@',
				'1 WIFE @I2@',
				'1 CHIL @I1@',
				'1 CHAN',
				'2 DATE 15 APR 2020',
				'3 TIME 16:40:57',
				'0 TRLR',
			],
			{
				'Persons': [
					{
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
					{
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
				  {
						'Gender': 1,
						'DateCreated': '2020-04-15T16:41:07',
						'Names': [
					  {
								'FactTypeId': 100,
								'GivenNames': 'Frank',
								'Surnames': 'Henderson',
					  },
						],
				  },
				],
				'Familys': [
				  {
						'DateCreated': '2020-04-15T16:40:57',
				  },
				],
				'Childs': [
				  {
						'RelationshipToFather': 1,
						'RelationshipToMother': 1,
				  },
				],
				'SourceRepos': [],
				'MasterSources': [],
				'Medias': [],
				'FactTypes': [],
			  },
		],
		[
			[
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
				'2 TIME 15:44:29',
				'1 FILE Siblings.ged',
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
				'1 FAMC @F1@',
				'1 _UID 1A063542-AC5D-4FEA-A91C-FCCFD1B8C9C1',
				'1 CHAN',
				'2 DATE 15 APR 2020',
				'3 TIME 16:42:39',
				'0 @I2@ INDI',
				'1 NAME Jane /Smith/',
				'2 GIVN Jane',
				'2 SURN Smith',
				'2 _PRIM Y',
				'1 SEX F',
				'1 BIRT',
				'2 _PRIM Y',
				'1 FAMS @F1@',
				'1 _UID 9CE91117-3D67-4F34-9581-5DC2F8808674',
				'1 CHAN',
				'2 DATE 15 APR 2020',
				'3 TIME 16:43:06',
				'0 @I3@ INDI',
				'1 NAME Frank /Henderson/',
				'2 GIVN Frank',
				'2 SURN Henderson',
				'2 _PRIM Y',
				'1 SEX M',
				'1 BIRT',
				'2 _PRIM Y',
				'1 FAMS @F1@',
				'1 _UID DD0EC592-BAF7-4756-B706-094E2B8D436E',
				'1 CHAN',
				'2 DATE 15 APR 2020',
				'3 TIME 16:43:01',
				'0 @I4@ INDI',
				'1 NAME Rachel /Henderson/',
				'2 GIVN Rachel',
				'2 SURN Henderson',
				'2 _PRIM Y',
				'1 SEX M',
				'1 FAMC @F1@',
				'1 _UID B4C39338-64A4-4AC3-BFA6-E522B4059EC4',
				'1 CHAN',
				'2 DATE 15 APR 2020',
				'3 TIME 16:44:00',
				'0 @F1@ FAM',
				'1 HUSB @I3@',
				'1 WIFE @I2@',
				'1 CHIL @I1@',
				'1 CHIL @I4@',
				'1 CHAN',
				'2 DATE 15 APR 2020',
				'3 TIME 16:43:01',
				'0 TRLR',
			],
			{
				'Persons': [
					{
						  'IsLiving': true,
						  'Gender': 1,
						  'DateCreated': '2020-04-15T16:42:39',
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
					{
						  'IsLiving': true,
						  'Gender': 2,
						  'DateCreated': '2020-04-15T16:43:06',
						  'Names': [
							{
								  'FactTypeId': 100,
								  'GivenNames': 'Jane',
								  'Surnames': 'Smith',
							},
						  ],
						  'Facts': [
							  {
								'FactTypeId': 405,
								'Preferred': true,
							},
						],
					},
				  {
						'IsLiving': true,
						'Gender': 1,
						'DateCreated': '2020-04-15T16:43:01',
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
				  {
						'Gender': 1,
						'DateCreated': '2020-04-15T16:44:00',
						'Names': [
					  {
								'FactTypeId': 100,
								'GivenNames': 'Rachel',
								'Surnames': 'Henderson',
					  },
						],
				  },
				],
				'Familys': [
				  {
						'DateCreated': '2020-04-15T16:43:01',
				  },
				],
				'Childs': [
				  {
						'RelationshipToFather': 1,
						'RelationshipToMother': 1,
				  },
				  {
						'RelationshipToFather': 1,
						'RelationshipToMother': 1,
				  },
				],
				'SourceRepos': [],
				'MasterSources': [],
				'Medias': [],
				'FactTypes': [],
			  },
		],
	];

	describe.each(gedcoms)(
		'when given gedcom broken up by lines',
		(gedcomLines, expectedFmpTree) => {
			const actualFmpTree = buildFmpTree(gedcomLines);

			const actualIds = [].concat(
				actualFmpTree.Persons.map(person => person.Id),
				actualFmpTree.Familys.map(family => family.Id),
				actualFmpTree.Childs.map(child => child.Id)
			);

			it('builds an FMP tree with the expected structure', () => {
				expect(actualFmpTree).toMatchObject(expectedFmpTree);
			});

			it('has ids that are unique across tree', () => {
				const uniqueIdsCount = new Set(actualIds).size;
				expect(actualIds.length).toStrictEqual(uniqueIdsCount);
			});

			it.each(actualIds)('id is a numbers', actualId => {
				expect(typeof actualId).toStrictEqual('number');
			});
		}
	);
});
