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
										lineValue: 'Reg',
									},
								},
							],
							SURN: [
								{
									value: {
										lineValue: 'Oyce',
									},
								},
							],
						},
					],
					SEX: [
						{
							value: {
								lineValue: 'M',
							},
						},
					],
					BIRT: [
						{
							DATE: [
								{
									value: {
										lineValue: '1 Jan 1990',
									},
								},
							],
						},
					],
					FAMC: [
						{
							value: {
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
												lineValue: '16:42:39',
											},
										},
									],
									value: {
										lineValue: '15 APR 2020',
									},
								},
							],
						},
					],
					value: {
						xrefId: '@I1@',
					},
				},
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										lineValue: 'Gladys',
									},
								},
							],
							SURN: [
								{
									value: {
										lineValue: 'Canby',
									},
								},
							],
						},
					],
					SEX: [
						{
							value: {
								lineValue: 'F',
							},
						},
					],
					BIRT: [
						{},
					],
					CHAN: [
						{
							DATE: [
								{
									TIME: [
										{
											value: {
												lineValue: '16:43:06',
											},
										},
									],
									value: {
										lineValue: '15 APR 2020',
									},
								},
							],
						},
					],
					value: {
						xrefId: '@I2@',
					},
				},
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										lineValue: 'Hedda',
									},
								},
							],
							SURN: [
								{
									value: {
										lineValue: 'Hare',
									},
								},
							],
						},
					],
					SEX: [
						{
							value: {
								lineValue: 'M',
							},
						},
					],
					BIRT: [
						{},
					],
					CHAN: [
						{
							DATE: [
								{
									TIME: [
										{
											value: {
												lineValue: '16:43:01',
											},
										},
									],
									value: {
										lineValue: '15 APR 2020',
									},
								},
							],
						},
					],
					value: {
						xrefId: '@I3@',
					},
				},
				{
					NAME: [
						{
							GIVN: [
								{
									value: {
										lineValue: 'Eileen',
									},
								},
							],
							SURN: [
								{
									value: {
										lineValue: 'Dover',
									},
								},
							],
							value: {
								lineValue: 'Eileen /Dover/',
							},
						},
					],
					SEX: [
						{
							value: {
								lineValue: 'M',
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
												lineValue: '16:44:00',
											},
										},
									],
									value: {
										lineValue: '15 APR 2020',
									},
								},
							],
						},
					],
					value: {
						xrefId: '@I4@',
					},
				},
			],
			FAM: [
				{
					HUSB: [
						{
							value: {
								lineValue: '@I1@',
							},
						},
					],
					WIFE: [
						{
							value: {
								lineValue: '@I2@',
							},
						},
					],
					CHIL: [
						{
							value: {
								lineValue: '@I3@',
							},
						},
						{
							value: {
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
												lineValue: '16:43:01',
											},
										},
									],
									value: {
										lineValue: '15 APR 2020',
									},
								},
							],
						},
					],
					value: {
						xrefId: '@F1@',
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
							Surnames: 'Dover',
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
