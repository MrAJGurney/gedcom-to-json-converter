'use strict';

const structureGedcomLine = gedcomLine => {
	const lineComponents = gedcomLine.split(' ');
	return {
		level: getLevel(lineComponents),
		xrefId: getXrefId(lineComponents),
		tag: getTag(lineComponents),
		lineValue: getLineValue(lineComponents),
	};
};

const getLevel = lineComponents => {
	const levelComponent = lineComponents[0];
	return parseInt(levelComponent, 10);
};

const getXrefId = lineComponents => {
	const xrefIdComponent = lineComponents[1];
	return isXrefId(xrefIdComponent) ? xrefIdComponent : null;
};

const getTag = lineComponents => {
	const tagComponentIndex = isXrefId(lineComponents[1]) ? 2 : 1;
	return lineComponents[tagComponentIndex];
};

const getLineValue = lineComponents => {
	const lineValueComponentStartIndex = isXrefId(lineComponents[1]) ? 3 : 2;
	return lineValueComponentStartIndex >= lineComponents.length
		? null
		: buildLineValue(lineComponents, lineValueComponentStartIndex);
};

const isXrefId = xrefId => {
	return xrefId[0] === '@';
};

const buildLineValue = (lineComponents, lineValueComponentStartIndex) => {
	return lineComponents
		.slice(lineValueComponentStartIndex)
		.join(' ');
};

module.exports = {
	structureGedcomLine,
};