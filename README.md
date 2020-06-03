<!-- omit in toc -->
# gedcom-to-json-converter

Run scripts and tests from root of repository.

- [Run Parsing Script](#run-parsing-script)
- [Code Coverage](#code-coverage)

## Run Parsing Script

```bash
node index.js <PATH_TO_GEDCOM_FOLDER>
```

## Code Coverage

Note: `index.js` has no tests as it's a script file which only extracts the command line argument.

```bash
npm test -- --coverage
```

```text
------------------------------------------------------------------------------------|---------|----------|---------|---------|-------------------
File                                                                                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------------------------------------------------------------|---------|----------|---------|---------|-------------------
All files                                                                           |   98.93 |      100 |     100 |   98.93 |                   
 gedcom-to-json-converter                                                           |       0 |      100 |     100 |       0 |                   
  index.js                                                                          |       0 |      100 |     100 |       0 | 4-8               
 gedcom-to-json-converter/gedcom-to-json-converter                                  |     100 |      100 |     100 |     100 |                   
  gedcom-to-json-converter.js                                                       |     100 |      100 |     100 |     100 |                   
 gedcom-to-json-converter/gedcom-to-json-converter/build-fmp-tree                   |     100 |      100 |     100 |     100 |                   
  build-fmp-date-created.js                                                         |     100 |      100 |     100 |     100 |                   
  build-fmp-id-generator.js                                                         |     100 |      100 |     100 |     100 |                   
  build-fmp-tree.js                                                                 |     100 |      100 |     100 |     100 |                   
 gedcom-to-json-converter/gedcom-to-json-converter/build-fmp-tree/build-fmp-childs  |     100 |      100 |     100 |     100 |                   
  build-fmp-child.js                                                                |     100 |      100 |     100 |     100 |                   
  build-fmp-childs.js                                                               |     100 |      100 |     100 |     100 |                   
 gedcom-to-json-converter/gedcom-to-json-converter/build-fmp-tree/build-fmp-familys |     100 |      100 |     100 |     100 |                   
  build-fmp-family.js                                                               |     100 |      100 |     100 |     100 |                   
  build-fmp-familys-ids.js                                                          |     100 |      100 |     100 |     100 |                   
  build-fmp-familys.js                                                              |     100 |      100 |     100 |     100 |                   
 gedcom-to-json-converter/gedcom-to-json-converter/build-fmp-tree/build-fmp-persons |     100 |      100 |     100 |     100 |                   
  build-fmp-birth-fact.js                                                           |     100 |      100 |     100 |     100 |                   
  build-fmp-gender.js                                                               |     100 |      100 |     100 |     100 |                   
  build-fmp-is-living.js                                                            |     100 |      100 |     100 |     100 |                   
  build-fmp-name-fact.js                                                            |     100 |      100 |     100 |     100 |                   
  build-fmp-person.js                                                               |     100 |      100 |     100 |     100 |                   
  build-fmp-persons-ids.js                                                          |     100 |      100 |     100 |     100 |                   
  build-fmp-persons.js                                                              |     100 |      100 |     100 |     100 |                   
 gedcom-to-json-converter/gedcom-to-json-converter/parse-gedcom-document            |     100 |      100 |     100 |     100 |                   
  build-structured-gedcom-line.js                                                   |     100 |      100 |     100 |     100 |                   
  build-structured-gedcom.js                                                        |     100 |      100 |     100 |     100 |                   
  parse-gedcom-document.js                                                          |     100 |      100 |     100 |     100 |                   
  split-gedcom-lines.js                                                             |     100 |      100 |     100 |     100 |                   
------------------------------------------------------------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 20 passed, 20 total
Tests:       61 passed, 61 total
Snapshots:   0 total
Time:        4.105 s
Ran all test suites.
```
