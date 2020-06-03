'use strict';

const { buildFmpNameFact, } = require('./build-fmp-name-fact');

describe('buildFmpNameFact', () => {
	const givenNameAndSurnameCase = {
		gedcomPerson: {
			NAME: [{
				GIVN: [{
					value: {
						lineValue: 'John',
					},
				}, ],
				SURN: [{
					value: {
						lineValue: 'Smith',
					},
				}, ],
			}, ],
		},
		expectedNameFact: {
			FactTypeId: 100,
			GivenNames: 'John',
			Surnames: 'Smith',
		},
	};

	describe('with parameters to build a name fact', () => {
		it.each([
			givenNameAndSurnameCase,
		])(
			'builds the expected name fact',
			({ gedcomPerson, expectedNameFact, }) => {
				const actualNameFact = buildFmpNameFact(gedcomPerson);

				expect(actualNameFact).toStrictEqual(expectedNameFact);
			}
		);
	});
});

