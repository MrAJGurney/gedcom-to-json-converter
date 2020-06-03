'use strict';

const { buildFmpPersonsIds, } = require('./build-fmp-persons-ids');

describe('buildFmpPersonsIds', () => {
	const noIndividualsCase = {
		gedcom: {},
		expectedPersonsIds: {},
	};

	const oneIndividualCase = {
		gedcom: {
			INDI: [
				{
					value: {
						xrefId: '@I1@',
					},
				},
			], },
		expectedPersonsIds: {
			'@I1@': 1000000,
		},
	};

	const multipleIndividualsCase = {
		gedcom: {
			INDI: [
				{
					value: {
						xrefId: '@I1@',
					},
				},
				{
					value: {
						xrefId: '@I2@',
					},
				},
				{
					value: {
						xrefId: '@I3@',
					},
				},
			], },
		expectedPersonsIds: {
			'@I1@': 1000000,
			'@I2@': 1000001,
			'@I3@': 1000002,
		},
	};

	describe('with parameters to build persons ids', () => {
		it.each([
			noIndividualsCase,
			oneIndividualCase,
			multipleIndividualsCase,
		])(
			'builds the expected persons ids',
			({
				gedcom,
				expectedPersonsIds,
			}) => {
				const actualPersonsIds = buildFmpPersonsIds(
					gedcom
				);

				expect(actualPersonsIds).toStrictEqual(expectedPersonsIds);
			}
		);
	});
});