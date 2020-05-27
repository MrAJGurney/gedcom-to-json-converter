'use strict';

const {
	structureGedcomLine,
} = require('./structure-gedcom-line');

const structureGedcom = gedcomLines => {
	const structuredLines = gedcomLines.map(line => structureGedcomLine(line));

	const structuredGedcom = recursivelyStructureSections(structuredLines);

	return structuredGedcom;
};

const recursivelyStructureSections = (
	structuredLines,
	initialLineIndex = 0
) => {
	const structuredGedcom = {};

	const initialLine = structuredLines[initialLineIndex];

	for (
		let lineIndex = initialLineIndex;
		lineIndex < structuredLines.length;
		lineIndex++
	) {
		const currentLine = structuredLines[lineIndex];

		if (currentLine.level < initialLine.level) {
			break;
		}

		if (currentLine.level > initialLine.level) {
			continue;
		}

		const { tag, } = currentLine;
		if (!structuredGedcom.hasOwnProperty(tag)) {
			structuredGedcom[tag] = [];
		}

		const structuredSubsection =
			lineHasChildLines(structuredLines, lineIndex)
				? recursivelyStructureSections(structuredLines, lineIndex + 1)
				: {};

		structuredSubsection.value = currentLine;

		structuredGedcom[tag].push(structuredSubsection);
	}

	return structuredGedcom;
};

const lineHasChildLines = (structuredLines, lineIndex) => {
	if (lineIndex === structuredLines.length - 1) {
		return false;
	}

	const currentLine = structuredLines[lineIndex];
	const nextLine = structuredLines[lineIndex + 1];

	return currentLine.level < nextLine.level;
};

module.exports = {
	structureGedcom,
};