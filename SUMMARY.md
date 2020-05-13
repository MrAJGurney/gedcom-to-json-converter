<!-- omit in toc -->
# GEDCOM Parser SUMMARY

- [Algorithm](#algorithm)
- [Language Choice](#language-choice)
- [Successes](#successes)
  - [Separation of Concerns](#separation-of-concerns)
  - [Testing](#testing)
- [Difficulties](#difficulties)
  - [Unit Test Dependencies](#unit-test-dependencies)
  - [Entangled Childs & Familys Builders](#entangled-childs--familys-builders)
  - [Inability to Write End-to-End Tests](#inability-to-write-end-to-end-tests)
  - [Test File Structuring](#test-file-structuring)
- [Learnings](#learnings)
  - [Using the Right Tool](#using-the-right-tool)

## Algorithm

- read the GEDCOM file
- split the GEDCOM file into lines
- discard any lines without text
- build a nested, queryable data structure¹ from the GEDCOM lines
- for each GEDCOM individual build an FMP person and map the GEDCOM reference to FMP ID
- for each GEDCOM family build an FMP family and FMP children for that family
- collate the children from all familys
- build an FMP tree from the persons, familys and childs
- delete any existing output file if it already exists
- write the FMP tree to a new output file

¹ For example data structures, see [structure-gedcom.spec.js](./build-fmp-tree/structure-gedcom.spec.js)

## Language Choice

For my first "official" entry I wanted to stick with the language I'm most familiar with: JavaScript.

## Successes

### Separation of Concerns

I'm happy with how separated and independent the different parts of the script are. The file that builds the FMP tree doesn't care about how the file that builds the FMP person works, or what a GEDCOM line looks like.

### Testing

I'm also happy about the test coverage, and the way edge cases are handled.

## Difficulties

### Unit Test Dependencies

The unit tests for intermediary stages (e.g. the FMP person builder) rely on the functionality of its dependencies. While a change to the FMP birth fact builder wouldn't require changes to the FMP person builder, the tests would need updating.

One way to mitigate this would have been to override the dependencies with mock functions that returned symbols. The FMP person builder test file would just be testing the FMP person builder, and not the FMP birth fact builder.

### Entangled Childs & Familys Builders

The FMP child builder is nested within the family builder, despite being separate (albeit related) properties of the tree structure. Separating them would be possible but would likely result in the FMP tree builder doing even more work.

In an ideal world I'd continue working on seperating them out, but for now I'll leave them as is.

### Inability to Write End-to-End Tests

I was unable to find a way of running the `index.js` script with file location parameters in jest, which means there's no fully automated end-to-end tests.

The best I can think of is creating a new file whose sole purpose is retrieving the argument values (`process.argv`) and then stubbing the function in an integration test. It still wouldn't tell me if I'd incorrectly set up the command line argument processing though.

### Test File Structuring

I struggled with naming tests, and at certain point just stuck them into a big array that's processed in a `describe.each` or `it.each` loop. The naming is awkward too, with lines like `'when given structured gedcom'` appearing over a dozen times throughout the test files.

While I'm happy with the test cases (100% code coverage!), the naming conventions and test file structures needs work.

## Learnings

### Using the Right Tool

I believe every (non deprecated) function/utility/class has its use, so when I needed to "map" an GEDCOM individual's `xrefId` to an FMP person's `Id` I used a [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object.

While this seems the perfect use of a map, an [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) would have been the better choice. Maps are much less common than objects, and so there's an increased cognitive load when using them. For the limited usecase I gained nothing from using them, and lost time when debugging issues (you can `console.log` an object to get that object, but if you `console.log` a map you get an empty object regardless of whether or not it's been populated).
