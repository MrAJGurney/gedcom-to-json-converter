<!-- omit in toc -->
# GEDCOM Parser

Navigate to `coding-challenge/challenge-2/andrew` before running scripts or tests.

- [Run Parsing Script](#run-parsing-script)
- [Code Coverage](#code-coverage)
- [Execution Speed](#execution-speed)
  - [sibling](#sibling)
- [Memory Footprint](#memory-footprint)
  - [sibling](#sibling-1)

## Run Parsing Script

```bash
node index.js <PATH_TO_GEDCOM_INPUT_FILE> <PATH_TO_FMP_TREE_OUTPUT_FILE>
```

## Code Coverage

Note that `index.js` has no unit tests, as it's behaviour is covered by the scripts testing the output of the gedcom parser.

```bash
npm test -- --coverage
```

```text
---------------------------------|---------|----------|---------|---------|-------------------
File                             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------------|---------|----------|---------|---------|-------------------
All files                        |     100 |      100 |     100 |     100 |                   
 build-fmp-birth-fact.js         |     100 |      100 |     100 |     100 |                   
 build-fmp-child.js              |     100 |      100 |     100 |     100 |                   
 build-fmp-date-created.js       |     100 |      100 |     100 |     100 |                   
 build-fmp-family-with-childs.js |     100 |      100 |     100 |     100 |                   
 build-fmp-gender.js             |     100 |      100 |     100 |     100 |                   
 build-fmp-is-living.js          |     100 |      100 |     100 |     100 |                   
 build-fmp-name-fact.js          |     100 |      100 |     100 |     100 |                   
 build-fmp-person-with-id-map.js |     100 |      100 |     100 |     100 |                   
 build-fmp-tree.js               |     100 |      100 |     100 |     100 |                   
 get-gedcom-components.js        |     100 |      100 |     100 |     100 |                   
 split-gedcom.js                 |     100 |      100 |     100 |     100 |                   
 structure-gedcom.js             |     100 |      100 |     100 |     100 |                   
---------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 12 passed, 12 total
Tests:       62 passed, 62 total
Snapshots:   0 total
Time:        2.136 s
Ran all test suites.

```

## Execution Speed

```bash
time node index.js <PATH_TO_GEDCOM_INPUT_FILE> <PATH_TO_FMP_TREE_OUTPUT_FILE>
```

### sibling

```bash
time node index.js ../tests/sibling/sibling.ged ../tests/sibling/actual.json
```

```text
real  0m0.062s
user  0m0.040s
sys   0m0.024s
```

## Memory Footprint

```bash
valgrind node index.js <PATH_TO_GEDCOM_INPUT_FILE> <PATH_TO_FMP_TREE_OUTPUT_FILE>
```

### sibling

```bash
valgrind node index.js ../tests/sibling/sibling.ged ../tests/sibling/actual.json
```

```text
==13603== HEAP SUMMARY:
==13603==     in use at exit: 10,022 bytes in 33 blocks
==13603==   total heap usage: 15,773 allocs, 15,740 frees, 15,878,365 bytes allocated
==13603== 
==13603== LEAK SUMMARY:
==13603==    definitely lost: 0 bytes in 0 blocks
==13603==    indirectly lost: 0 bytes in 0 blocks
==13603==      possibly lost: 304 bytes in 1 blocks
==13603==    still reachable: 9,718 bytes in 32 blocks
==13603==         suppressed: 0 bytes in 0 blocks
==13603== Rerun with --leak-check=full to see details of leaked memory
==13603== 
==13603== For lists of detected and suppressed errors, rerun with: -s
==13603== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
