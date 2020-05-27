'use strict';

const structureGedcomLine = line => {
	return {
		level: getLevel(line),
		xrefId: getXrefId(line),
		tag: getTag(line),
		lineValue: getLineValue(line),
	};
};

const getLevel = line => {
	const lineComponents = line.split(' ');
	const levelComponent = lineComponents[0];
	return parseInt(levelComponent, 10);
};

const getXrefId = line => {
	const lineComponents = line.split(' ');
	const xrefIdComponent = lineComponents[1];
	return isXrefId(xrefIdComponent) ? xrefIdComponent : null;
};

const getTag = line => {
	const lineComponents = line.split(' ');
	const tagComponentIndex = isXrefId(lineComponents[1]) ? 2 : 1;
	return lineComponents[tagComponentIndex];
};

const getLineValue = line => {
	const lineComponents = line.split(' ');
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