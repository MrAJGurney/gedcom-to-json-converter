'use strict';

const gedcomChangeTag = 'CHAN';
const gedcomDateTag = 'DATE';
const gedcomTimeTag = 'TIME';

const millisecondsInMinute = 60000;

const buildFmpDateCreated = structuredGedcom => {
	const gedcomDate = structuredGedcom
		[gedcomChangeTag][0]
		[gedcomDateTag][0];

	const gedcomDateTimeValues = [gedcomDate.value.lineValue, ];

	if (gedcomDate.hasOwnProperty(gedcomTimeTag)) {
		const gedcomTime = gedcomDate[gedcomTimeTag][0];
		gedcomDateTimeValues.push(gedcomTime.value.lineValue);
	}

	const combinedDateTimeValue = gedcomDateTimeValues.join(' ');

	const epoch = Date.parse(combinedDateTimeValue);
	const timezoneOffset = (
		new Date(combinedDateTimeValue)
	).getTimezoneOffset();

	const fmpDateWithTail = new Date(
		epoch - (timezoneOffset * millisecondsInMinute)
	);

	const fmpDate = fmpDateWithTail.toISOString().split('.')[0];

	return fmpDate;
};

module.exports = {
	buildFmpDateCreated,
};