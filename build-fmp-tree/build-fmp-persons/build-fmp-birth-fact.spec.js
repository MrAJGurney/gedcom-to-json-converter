'use strict';

const { buildFmpBirthFact, } = require('./build-fmp-birth-fact');

describe('buildFmpBirthFact', () => {

	const noBirthCase = {
		gedcomPerson: {},
		expectedBirthFact: {
			FactTypeId: 405,
			Preferred: true,
		},
	};

	const birthCase = {
		gedcomPerson: {
			BIRT: [{
			}, ],
		},
		expectedBirthFact: {
			FactTypeId: 405,
			Preferred: true,
		},
	};

	const birthPlaceCase = {
		gedcomPerson: {
			BIRT: [{
				PLAC: [{
					value: {
						lineValue: 'Dundee',
					},
				}, ],
			}, ],
		},
		expectedBirthFact: {
			FactTypeId: 405,
			Place: {
				PlaceName: 'Dundee',
			},
			Preferred: true,
		},
	};

	const birthDateCase = {
		gedcomPerson: {
			BIRT: [{
				DATE: [{
					value: {
						lineValue: '1 Jan 1990',
					},
				}, ],
			}, ],
		},
		expectedBirthFact: {
			FactTypeId: 405,
			DateDetail: '1 Jan 1990',
			Preferred: true,
		},
	};

	const birthDateAndPlaceCase = {
		gedcomPerson: {
			BIRT: [{
				DATE: [{
					value: {
						lineValue: '2 Mar 1825',
					},
				}, ],
				PLAC: [{
					value: {
						lineValue: 'London',
					},
				}, ],
			}, ],
		},
		expectedBirthFact: {
			FactTypeId: 405,
			DateDetail: '2 Mar 1825',
			Place: {
				PlaceName: 'London',
			},
			Preferred: true,
		},
	};

	describe('with parameters to build a birth fact', () => {
		it.each([
			noBirthCase,
			birthCase,
			birthPlaceCase,
			birthDateCase,
			birthDateAndPlaceCase,
		])(
			'builds the expected birth fact',
			({ gedcomPerson, expectedBirthFact, }) => {
				const actualBirthFact = buildFmpBirthFact(gedcomPerson);

				expect(actualBirthFact).toStrictEqual(expectedBirthFact);
			}
		);
	});
});