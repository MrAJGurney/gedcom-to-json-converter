'use strict';

const splitGedcom = gedcom => {
	const gedcomLines = gedcom.split(/(\r\n|\n\r|\r|\n)/);

	const nonEmptyGedcomLines = gedcomLines.filter(
		line => line.length>0 && /\S/.test(line)
	);

	return nonEmptyGedcomLines;
};

module.exports = {
	splitGedcom,
};