'use strict';

const { buildFmpIdGenerator, } = require('./build-fmp-id-generator');

describe('fmpIdGenerator', () => {
	const noIncrementCase = {
		initialValue: 0,
		increment: 0,
		expectedGeneratedIds: [0, 0, 0, 0, 0, ],
	};

	const positiveIncrementCase = {
		initialValue: -10,
		increment: 5,
		expectedGeneratedIds: [-10, -5, 0, 5, 10, ],
	};

	const negativeIncrementCase = {
		initialValue: 12,
		increment: -7,
		expectedGeneratedIds: [12, 5, -2, -9, -16, ],
	};

	describe('with parameters to build an id generator', () => {
		it.each([
			noIncrementCase,
			positiveIncrementCase,
			negativeIncrementCase,
		])('builds an id generator that generates the expected ids', ({
			initialValue,
			increment,
			expectedGeneratedIds,
		}) => {
			const idGenerator = buildFmpIdGenerator(initialValue, increment);
			expect([
				idGenerator.next().value,
				idGenerator.next().value,
				idGenerator.next().value,
				idGenerator.next().value,
				idGenerator.next().value,
			]).toStrictEqual(expectedGeneratedIds);
		});
	});
});