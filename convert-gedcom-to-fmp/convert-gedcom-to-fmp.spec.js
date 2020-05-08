'use strict';

const { convertGedcomToFmp, } = require('./convert-gedcom-to-fmp');

describe('convertGedcomToFmp', () => {
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

		const actual = convertGedcomToFmp(gedcom);

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

