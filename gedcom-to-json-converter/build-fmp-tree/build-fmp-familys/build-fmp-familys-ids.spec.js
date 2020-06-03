'use strict';

const { buildFmpFamilysIds, } = require('./build-fmp-familys-ids');

describe('buildFmpFamilysIds', () => {
	const noFamilyCase = {
		gedcom: {},
		expectedFamilysIds: {},
	};

	const oneFamilyCase = {
		gedcom: {
			FAM: [
				{
					value: {
						xrefId: '@F1@',
					},
				},
			],
		},
		expectedFamilysIds: {
			'@F1@': 1,
		},
	};

	const multipleFamiliesCase = {
		gedcom: {
			FAM: [
				{
					value: {
						xrefId: '@F1@',
					},
				},
				{
					value: {
						xrefId: '@F2@',
					},
				},
			],
		},
		expectedFamilysIds: {
			'@F1@': 1,
			'@F2@': 2,
		},
	};

	describe('with parameters to build familys ids', () => {
		it.each([
			noFamilyCase,
			oneFamilyCase,
			multipleFamiliesCase,
		])(
			'builds the expected familys ids',
			({
				gedcom,
				expectedFamilysIds,
			}) => {
				const actualFamilysIds = buildFmpFamilysIds(
					gedcom
				);

				expect(actualFamilysIds).toStrictEqual(expectedFamilysIds);
			}
		);
	});
});