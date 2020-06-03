'use strict';

const { buildFmpTree, } = require('./build-fmp-tree');

describe('buildFmpTree', () => {
	const partnersWithMultipleChildrenCase = {
		gedcom: {
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
					FAMC: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'FAMC',
								lineValue: '@F1@',
							},
						},
					],
					CHAN: [
						{
							DATE: [
								{
									TIME: [
										{
											value: {
												level: 3,
												xrefId: null,
												tag: 'TIME',
												lineValue: '16:42:39',
											},
										},
									],
									value: {
										level: 2,
										xrefId: null,
										tag: 'DATE',
										lineValue: '15 APR 2020',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'CHAN',
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
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'GIVN',
										lineValue: 'Gladys',
									},
								},
							],
							SURN: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'SURN',
										lineValue: 'Canby',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'NAME',
								lineValue: 'Gladys /Canby/',
							},
						},
					],
					SEX: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'SEX',
								lineValue: 'F',
							},
						},
					],
					BIRT: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'BIRT',
								lineValue: null,
							},
						},
					],
					FAMS: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'FAMS',
								lineValue: '@F1@',
							},
						},
					],
					CHAN: [
						{
							DATE: [
								{
									TIME: [
										{
											value: {
												level: 3,
												xrefId: null,
												tag: 'TIME',
												lineValue: '16:43:06',
											},
										},
									],
									value: {
										level: 2,
										xrefId: null,
										tag: 'DATE',
										lineValue: '15 APR 2020',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'CHAN',
								lineValue: null,
							},
						},
					],
					value: {
						level: 0,
						xrefId: '@I2@',
						tag: 'INDI',
						lineValue: null,
					},
				},
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'GIVN',
										lineValue: 'Hedda',
									},
								},
							],
							SURN: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'SURN',
										lineValue: 'Hare',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'NAME',
								lineValue: 'Hedda /Hare/',
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
							value: {
								level: 1,
								xrefId: null,
								tag: 'BIRT',
								lineValue: null,
							},
						},
					],
					FAMS: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'FAMS',
								lineValue: '@F1@',
							},
						},
					],
					CHAN: [
						{
							DATE: [
								{
									TIME: [
										{
											value: {
												level: 3,
												xrefId: null,
												tag: 'TIME',
												lineValue: '16:43:01',
											},
										},
									],
									value: {
										level: 2,
										xrefId: null,
										tag: 'DATE',
										lineValue: '15 APR 2020',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'CHAN',
								lineValue: null,
							},
						},
					],
					value: {
						level: 0,
						xrefId: '@I3@',
						tag: 'INDI',
						lineValue: null,
					},
				},
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'GIVN',
										lineValue: 'Eileen',
									},
								},
							],
							SURN: [
								{
									value: {
										level: 2,
										xrefId: null,
										tag: 'SURN',
										lineValue: 'Henderson',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'NAME',
								lineValue: 'Eileen /Dover/',
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
					FAMC: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'FAMC',
								lineValue: '@F1@',
							},
						},
					],
					CHAN: [
						{
							DATE: [
								{
									TIME: [
										{
											value: {
												level: 3,
												xrefId: null,
												tag: 'TIME',
												lineValue: '16:44:00',
											},
										},
									],
									value: {
										level: 2,
										xrefId: null,
										tag: 'DATE',
										lineValue: '15 APR 2020',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'CHAN',
								lineValue: null,
							},
						},
					],
					value: {
						level: 0,
						xrefId: '@I4@',
						tag: 'INDI',
						lineValue: null,
					},
				},
			],
			FAM: [
				{
					HUSB: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'HUSB',
								lineValue: '@I1@',
							},
						},
					],
					WIFE: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'WIFE',
								lineValue: '@I2@',
							},
						},
					],
					CHIL: [
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'CHIL',
								lineValue: '@I3@',
							},
						},
						{
							value: {
								level: 1,
								xrefId: null,
								tag: 'CHIL',
								lineValue: '@I4@',
							},
						},
					],
					CHAN: [
						{
							DATE: [
								{
									TIME: [
										{
											value: {
												level: 3,
												xrefId: null,
												tag: 'TIME',
												lineValue: '16:43:01',
											},
										},
									],
									value: {
										level: 2,
										xrefId: null,
										tag: 'DATE',
										lineValue: '15 APR 2020',
									},
								},
							],
							value: {
								level: 1,
								xrefId: null,
								tag: 'CHAN',
								lineValue: null,
							},
						},
					],
					value: {
						level: 0,
						xrefId: '@F1@',
						tag: 'FAM',
						lineValue: null,
					},
				},
			],
		},
		expectedTree: {
			Persons: [
				{
					DateCreated: '2020-04-15T16:42:39',
					Facts: [
						{
							DateDetail: '1 Jan 1990',
							FactTypeId: 405,
							Preferred: true,
						},
					],
					Gender: 1,
					Id: 1000000,
					IsLiving: true,
					Names: [
						{
							FactTypeId: 100,
							GivenNames: 'Reg',
							Surnames: 'Oyce',
						},
					],
				},
				{
					DateCreated: '2020-04-15T16:43:06',
					Facts: [
						{
							FactTypeId: 405,
							Preferred: true,
						},
					],
					Gender: 2,
					Id: 1000001,
					IsLiving: true,
					Names: [
						{
							FactTypeId: 100,
							GivenNames: 'Gladys',
							Surnames: 'Canby',
						},
					],
				},
				{
					DateCreated: '2020-04-15T16:43:01',
					Facts: [
						{
							FactTypeId: 405,
							Preferred: true,
						},
					],
					Gender: 1,
					Id: 1000002,
					IsLiving: true,
					Names: [
						{
							FactTypeId: 100,
							GivenNames: 'Hedda',
							Surnames: 'Hare',
						},
					],
				},
				{
					DateCreated: '2020-04-15T16:44:00',
					Facts: [
						{
							FactTypeId: 405,
							Preferred: true,
						},
					],
					Gender: 1,
					Id: 1000003,
					IsLiving: true,
					Names: [
						{
							FactTypeId: 100,
							GivenNames: 'Eileen',
							Surnames: 'Henderson',
						},
					],
				},
			],
			Familys: [
				{
					DateCreated: '2020-04-15T16:43:01',
					FatherId: 1000000,
					Id: 1,
					MotherId: 1000001,
				},
			],
			Childs: [
				{
					ChildId: 1000002,
					FamilyId: 1,
					Id: -1,
					RelationshipToFather: 1,
					RelationshipToMother: 1,
				},
				{
					ChildId: 1000003,
					FamilyId: 1,
					Id: -2,
					RelationshipToFather: 1,
					RelationshipToMother: 1,
				},
			],
			SourceRepos: [],
			MasterSources: [],
			Medias: [],
			FactTypes: [],
		},
	};

	describe('with structured gedcom', () => {
		it.each([
			partnersWithMultipleChildrenCase,
		])(
			'builds an FMP tree with the expected structure',
			({ gedcom, expectedTree, }) => {
				const actualTree = buildFmpTree(gedcom);
				expect(actualTree).toStrictEqual(expectedTree);
			}
		);
	});
});
