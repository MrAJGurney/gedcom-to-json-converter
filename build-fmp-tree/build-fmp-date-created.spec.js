'use strict';

const { buildFmpDateCreated, } = require('./build-fmp-date-created');

describe('buildFmpDateCreated', () => {
	const dateOnlyBSTcase = {
		gedcom: {
			CHAN: [{
				DATE: [{
					value: {
						lineValue: '10 Jul 2020',
					},
				}, ],
			}, ],
		},
		expectedDateCreated: '2020-07-10T00:00:00',
	};

	const dateOnlyGMTcase = {
		gedcom: {
			CHAN: [{
				DATE: [{
					value: {
						lineValue: '25 Nov 2020',
					},
				}, ],
			}, ],
		},
		expectedDateCreated: '2020-11-25T00:00:00',
	};

	const dateAndTimeBSTCase = {
		gedcom: {
			CHAN: [{
				DATE: [{
					TIME: [{
						value: {
							lineValue: '16:38:50',
						},
					}, ],
					value: {
						lineValue: '15 APR 2020',
					},
				}, ],
			}, ],
		},
		expectedDateCreated: '2020-04-15T16:38:50',
	};

	const dateAndTimeGMTCase = {
		gedcom: {
			CHAN: [{
				DATE: [{
					TIME: [{
						value: {
							lineValue: '11:21:35',
						},
					}, ],
					value: {
						lineValue: '5 DEC 2020',
					},
				}, ],
			}, ],
		},
		expectedDateCreated: '2020-12-05T11:21:35',
	};

	describe('with gedcom containing a change property', () => {
		it.each([
			// BST in 2020:
			// - starts 29th of March
			// - ends 25th of October
			dateOnlyBSTcase,
			dateOnlyGMTcase,
			dateAndTimeBSTCase,
			dateAndTimeGMTCase,
		])(
			'builds the expected date created property',
			({ gedcom, expectedDateCreated, }) => {
				const actualDateCreated = buildFmpDateCreated(gedcom);

				expect(actualDateCreated).toStrictEqual(expectedDateCreated);
			}
		);
	});
});