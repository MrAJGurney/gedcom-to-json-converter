'use strict';

const {
	getLevel,
	getTag,
} = require('./get-gedcom-components');

const structureGedcom = (gedcomLines, initialLineIndex = 0) => {
	const structuredGedcom = {};
	const initialLine = gedcomLines[initialLineIndex];

	for (
		let lineIndex = initialLineIndex;
		lineIndex < gedcomLines.length;
		lineIndex++
	) {
		const currentLine = gedcomLines[lineIndex];

		if (getLevel(currentLine) < getLevel(initialLine)) {
			break;
		}

		if (getLevel(currentLine) > getLevel(initialLine)) {
			continue;
		}

		const tag = getTag(currentLine);
		if (!structuredGedcom.hasOwnProperty(tag)) {
			structuredGedcom[tag] = [];
		}

		const structuredSubsection =
			lineHasChildLines(gedcomLines, lineIndex)
				? structureGedcom(gedcomLines, lineIndex + 1)
				: {};

		structuredSubsection.value = currentLine;

		structuredGedcom[tag].push(structuredSubsection);
	}

	return structuredGedcom;
};

const lineHasChildLines = (gedcomLines, lineIndex) => {
	if (lineIndex === gedcomLines.length - 1) {
		return false;
	}

	const currentLine = gedcomLines[lineIndex];
	const nextLine = gedcomLines[lineIndex + 1];

	return getLevel(currentLine) < getLevel(nextLine);
};

module.exports = {
	structureGedcom,
};