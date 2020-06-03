'use strict';

const { gedcomToJsonConverter, } = require('./gedcom-to-json-converter');

const fs = require('fs');
jest.mock('fs');

jest.mock('./build-fmp-tree/build-fmp-tree');
const { buildFmpTree, }
    = require('./build-fmp-tree/build-fmp-tree');

jest.mock('./parse-gedcom-document/parse-gedcom-document');

afterAll(() => {
	jest.clearAllMocks();
});

function* buildMockTreesGenerator(trees) {
	let treeIndex = 0;
	while (true) {
		yield trees[treeIndex];
		treeIndex++;
	}
}

describe('parseGedcomDocument', () => {
	describe('with a folder of gedcom documents', () => {
		const folderName = 'tests';

		fs.readdirSync.mockImplementation(() => [
			'lower-case.ged',
			'upper-case.GED',
			'extra.period.ged',
			'not-ged.exe',
		]);

		const expectedReadGedcomFileParameters = [
			[1, 'tests/lower-case.ged', 'utf8', ],
			[2, 'tests/upper-case.GED', 'utf8', ],
			[3, 'tests/extra.period.ged', 'utf8', ],
		];

		const mockTreesGenerator = buildMockTreesGenerator([
			{ case: 'lower', },
			{ case: 'upper', },
			{ case: 'period', },
		]);

		buildFmpTree.mockImplementation(() =>
			mockTreesGenerator.next().value
		);

		const expectedWriteJsonFileParameters = [
			[ 1, 'tests/lower-case.json', '{\n  "case": "lower"\n}', ],
			[ 2, 'tests/upper-case.json', '{\n  "case": "upper"\n}', ],
			[ 3, 'tests/extra.period.json', '{\n  "case": "period"\n}', ],
		];

		gedcomToJsonConverter(folderName);

		it('reads from the expected number of gedcom files', () => {
			expect(fs.readFileSync).toHaveBeenCalledTimes(
				expectedReadGedcomFileParameters.length
			);
		});

 		it.each(expectedReadGedcomFileParameters)(
			'reads from the expected gedcom files',
			(callNumber, filePath, characterEncoding) => {
				expect(fs.readFileSync).toHaveBeenNthCalledWith(
					callNumber,
					filePath,
					characterEncoding
				);
			}
		);

		it('writes to the expected number of json files', () => {
			expect(fs.writeFileSync).toHaveBeenCalledTimes(
				expectedWriteJsonFileParameters.length
			);
		});

		it.each(expectedWriteJsonFileParameters)(
			'reads from the expected json files',
			(callNumber, filePath, stringifiedTree) => {
				expect(fs.writeFileSync).toHaveBeenNthCalledWith(
					callNumber,
					filePath,
					stringifiedTree
				);
			}
		);
	});
});