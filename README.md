<!-- omit in toc -->
# GEDCOM Parser

Navigate to `coding-challenge/challenge-2/andrew` before running scripts or tests.

- [Run Parsing Script](#run-parsing-script)
- [Code Coverage](#code-coverage)
- [Execution Speed](#execution-speed)
  - [one-node](#one-node)
  - [three-node](#three-node)
  - [sibling](#sibling)
- [Memory Footprint](#memory-footprint)
  - [one-node](#one-node-1)
  - [three-node](#three-node-1)
  - [sibling](#sibling-1)

## Run Parsing Script

```bash
node index.js <PATH_TO_GEDCOM_INPUT_FILE> <PATH_TO_FMP_TREE_OUTPUT_FILE>
```

## Code Coverage

```bash
npm test -- --coverage
```

```text
 PASS  build-fmp-tree/build-fmp-tree.spec.js
 PASS  build-fmp-tree/get-gedcom-components.spec.js
 PASS  build-fmp-tree/build-fmp-person-with-id-map.spec.js
 PASS  build-fmp-tree/build-fmp-family-with-childs.spec.js
 PASS  build-fmp-tree/structure-gedcom.spec.js
 PASS  build-fmp-tree/build-fmp-is-living.spec.js
 PASS  build-fmp-tree/build-fmp-birth-fact.spec.js
 PASS  build-fmp-tree/build-fmp-gender.spec.js
 PASS  build-fmp-tree/build-fmp-name-fact.spec.js
 PASS  build-fmp-tree/build-fmp-child.spec.js
 PASS  build-fmp-tree/build-fmp-date-created.spec.js
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
 structure-gedcom.js             |     100 |      100 |     100 |     100 |                   
---------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 11 passed, 11 total
Tests:       58 passed, 58 total
Snapshots:   0 total
Time:        2.14 s
Ran all test suites.
```

## Execution Speed

```bash
time node index.js <PATH_TO_GEDCOM_INPUT_FILE> <PATH_TO_FMP_TREE_OUTPUT_FILE>
```

### one-node

```bash
time node index.js ../tests/one-node/one-node.ged ../tests/one-node/actual.json
```

```text
real	0m0.044s
user	0m0.034s
sys	    0m0.012s
```

### three-node

```bash
time node index.js ../tests/three-node/three-node.ged ../tests/three-node/actual.json
```

```text
real	0m0.054s
user	0m0.036s
sys	    0m0.020s
```

### sibling

```bash
time node index.js ../tests/sibling/sibling.ged ../tests/sibling/actual.json
```

```text
real	0m0.060s
user	0m0.050s
sys 	0m0.013s
```

## Memory Footprint

```bash
valgrind node index.js <PATH_TO_GEDCOM_INPUT_FILE> <PATH_TO_FMP_TREE_OUTPUT_FILE>
```

### one-node

```bash
valgrind node index.js ../tests/one-node/one-node.ged ../tests/one-node/actual.json
```

```text
==9137== Memcheck, a memory error detector
==9137== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9137== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==9137== Command: node index.js ../tests/one-node/one-node.ged ../tests/one-node/actual.json
==9137== 
==9137== 
==9137== HEAP SUMMARY:
==9137==     in use at exit: 10,022 bytes in 33 blocks
==9137==   total heap usage: 15,402 allocs, 15,369 frees, 15,560,756 bytes allocated
==9137== 
==9137== LEAK SUMMARY:
==9137==    definitely lost: 0 bytes in 0 blocks
==9137==    indirectly lost: 0 bytes in 0 blocks
==9137==      possibly lost: 304 bytes in 1 blocks
==9137==    still reachable: 9,718 bytes in 32 blocks
==9137==         suppressed: 0 bytes in 0 blocks
==9137== Rerun with --leak-check=full to see details of leaked memory
==9137== 
==9137== For lists of detected and suppressed errors, rerun with: -s
==9137== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

### three-node

```bash
valgrind node index.js ../tests/three-node/three-node.ged ../tests/three-node/actual.json
```

```text
==9150== Memcheck, a memory error detector
==9150== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9150== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==9150== Command: node index.js ../tests/three-node/three-node.ged ../tests/three-node/actual.json
==9150== 
==9150== 
==9150== HEAP SUMMARY:
==9150==     in use at exit: 10,022 bytes in 33 blocks
==9150==   total heap usage: 15,732 allocs, 15,699 frees, 15,825,606 bytes allocated
==9150== 
==9150== LEAK SUMMARY:
==9150==    definitely lost: 0 bytes in 0 blocks
==9150==    indirectly lost: 0 bytes in 0 blocks
==9150==      possibly lost: 304 bytes in 1 blocks
==9150==    still reachable: 9,718 bytes in 32 blocks
==9150==         suppressed: 0 bytes in 0 blocks
==9150== Rerun with --leak-check=full to see details of leaked memory
==9150== 
==9150== For lists of detected and suppressed errors, rerun with: -s
==9150== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```

### sibling

```bash
valgrind node index.js ../tests/sibling/sibling.ged ../tests/sibling/actual.json
```

```text
==9172== Memcheck, a memory error detector
==9172== Copyright (C) 2002-2017, and GNU GPL'd, by Julian Seward et al.
==9172== Using Valgrind-3.15.0 and LibVEX; rerun with -h for copyright info
==9172== Command: node index.js ../tests/sibling/sibling.ged ../tests/sibling/actual.json
==9172== 
==9172== 
==9172== HEAP SUMMARY:
==9172==     in use at exit: 10,022 bytes in 33 blocks
==9172==   total heap usage: 15,703 allocs, 15,670 frees, 15,811,968 bytes allocated
==9172== 
==9172== LEAK SUMMARY:
==9172==    definitely lost: 0 bytes in 0 blocks
==9172==    indirectly lost: 0 bytes in 0 blocks
==9172==      possibly lost: 304 bytes in 1 blocks
==9172==    still reachable: 9,718 bytes in 32 blocks
==9172==         suppressed: 0 bytes in 0 blocks
==9172== Rerun with --leak-check=full to see details of leaked memory
==9172== 
==9172== For lists of detected and suppressed errors, rerun with: -s
==9172== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
