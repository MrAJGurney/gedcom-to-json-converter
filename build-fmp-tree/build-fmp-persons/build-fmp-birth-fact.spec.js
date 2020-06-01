'use strict';

const { buildFmpBirthFact, } = require('./build-fmp-birth-fact');

describe('buildFmpBirthFact', () => {
	const structuredGedcoms = [
		[
			{},
			{
				FactTypeId: 405,
				Preferred: true,
			},
		],
		[
			{
				BIRT: [{
					value: {
						level: 1,
						lineValue: null,
						tag: 'BIRT',
						xrefId: null,
					},
				}, ],
			},
			{
				FactTypeId: 405,
				Preferred: true,
			},
		],
		[
			{
				BIRT: [{
					PLAC: [{
						value: {
							level: 2,
							lineValue: 'Dundee',
							tag: 'PLAC',
							xrefId: null,
						},
					}, ],
					value: {
						level: 1,
						lineValue: null,
						tag: 'BIRT',
						xrefId: null,
					},
				}, ],
			},
			{
				FactTypeId: 405,
				Place: {
					PlaceName: 'Dundee',
				},
				Preferred: true,
			},
		],
		[
			{
				BIRT: [{
					DATE: [{
						value: {
							level: 2,
							lineValue: '1 Jan 1990',
							tag: 'DATE',
							xrefId: null,
						},
					}, ],
					value: {
						level: 1,
						lineValue: null,
						tag: 'BIRT',
						xrefId: null,
					},
				}, ],
			},
			{
				FactTypeId: 405,
				DateDetail: '1 Jan 1990',
				Preferred: true,
			},
		],
		[
			{
				BIRT: [{
					PLAC: [{
						value: {
							level: 2,
							lineValue: 'Dundee',
							tag: 'PLAC',
							xrefId: null,
						},
					}, ],
					DATE: [{
						value: {
							level: 2,
							lineValue: '1 Jan 1990',
							tag: 'DATE',
							xrefId: null,
						},
					}, ],
					value: {
						level: 1,
						lineValue: null,
						tag: 'BIRT',
						xrefId: null,
					},
				}, ],
			},
			{
				FactTypeId: 405,
				DateDetail: '1 Jan 1990',
				Place: {
					PlaceName: 'Dundee',
				},
				Preferred: true,
			},
		],
	];

	describe('when given structured gedcom', () => {
		it.each(structuredGedcoms)(
			'builds a birth fact',
			(structuredGedcom, expectedBirthFact) => {
				const actualBirthFact = buildFmpBirthFact(structuredGedcom);

				expect(actualBirthFact).toStrictEqual(expectedBirthFact);
			}
		);
	});
});