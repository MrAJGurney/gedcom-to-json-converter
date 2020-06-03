'use strict';

function* buildFmpIdGenerator(initialValue, increment) {
	let value = initialValue;
	while (true) {
		yield value;
		value += increment;
	}
}

module.exports = { buildFmpIdGenerator, };