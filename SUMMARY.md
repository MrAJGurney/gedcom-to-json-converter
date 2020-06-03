<!-- omit in toc -->
# GEDCOM Parser SUMMARY

- [Algorithm](#algorithm)
- [Language Choice](#language-choice)
- [Summary](#summary)

## Algorithm

- read all GEDCOM files in a directory
- for each file
  - build a nested, queryable data structure from the GEDCOM
  - for each GEDCOM individual build an FMP person
  - for each GEDCOM family build an FMP family
  - for each GEDCOM child (inside the GEDCOM familyies) build an FMP child
  - build an FMP tree from the persons, familys and childs
  - write the FMP tree to a JSON file with the same name as the GEDCOM file

## Language Choice

I wanted to stick with the language I'm most familiar with: JavaScript.

## Summary

Overall I'm very happy with my approach. Building a queryable data structure for the GEDCOM might be inefficient in terms of memory footprint and processing speed, but it made writing and debugging code relatively simple.

A few possible improvements:

- rather than an object, the queryable GEDCOM could be a class
- using an allowlist for GEDCOM tags used, so the queryable GEDCOM isn't bloated with information that isn't used (e.g. the `SOUR` tag)
