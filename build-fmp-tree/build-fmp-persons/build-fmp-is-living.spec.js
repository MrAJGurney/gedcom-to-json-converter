'use strict';

const { buildFmpIsLiving, } = require('./build-fmp-is-living');

describe('buildFmpBirthFact', () => {

	const noDeathCase = {
		gedcomPerson: {},
		expectedIsLiving: true,
	};

	const deathCase = {
		gedcomPerson: {
			DEAT: [{
			}, ],
		},
		expectedIsLiving: false,
	};

	describe('with parameters to build an \'isLiving\' property', () => {
		it.each([
			noDeathCase,
			deathCase,
		])(
			'builds the expected \'IsLiving\' property',
			({ gedcomPerson, expectedIsLiving, }) => {
				const actualIsLiving = buildFmpIsLiving(gedcomPerson);

				expect(actualIsLiving).toStrictEqual(expectedIsLiving);
			}
		);
	});
});

