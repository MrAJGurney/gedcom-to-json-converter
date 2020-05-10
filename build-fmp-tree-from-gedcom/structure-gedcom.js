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

		structuredGedcom[tag].push({
			value: currentLine,
		});
	}

	return structuredGedcom;
};

module.exports = {
	structureGedcom,
};