'use strict';

const { buildFmpTreeFromGedcom, } = require('./build-fmp-tree-from-gedcom');

describe('buildFmpTreeFromGedcom', () => {
	describe('when empty gedcom text is parsed', () => {
		const gedcom = '';

		const expectedProperties = [
			'Persons',
			'Familys',
			'Childs',
			'SourceRepos',
			'MasterSources',
			'Medias',
			'FactTypes',
		];

		const actual = buildFmpTreeFromGedcom(gedcom);

		describe.each(expectedProperties)(
			'result.%s',
			expectedProperty => {
				it('exists', () => {
					expect(actual).toHaveProperty(expectedProperty);
				});
				it('is an empty array', () => {
					expect(actual[expectedProperty]).toStrictEqual([]);
				});
			}
		);
	});
});

