'use strict';

const { buildFmpChild, } = require('./build-fmp-child');
const { buildFmpDateCreated, } = require('./build-fmp-date-created');

const gedcomChildTag = 'CHIL';

const buildFmpFamilyWithChilds = (
	gedcomFamily,
	familyId,
	gedcomIdToFmpId,
	childsIdGenerator
) => {
	const fmpFamily = {
		'Id': familyId,
		'DateCreated': buildFmpDateCreated(gedcomFamily),
		'MotherId': gedcomIdToFmpId
			.get(gedcomFamily['WIFE'][0].value.lineValue),
		'FatherId': gedcomIdToFmpId
			.get(gedcomFamily['HUSB'][0].value.lineValue),
	};

	const gedcomChildren =
		gedcomFamily.hasOwnProperty(gedcomChildTag)
			? gedcomFamily[gedcomChildTag]
			: [];

	const fmpChilds = gedcomChildren.map(
		gedcomChild => {
			const childId = childsIdGenerator.next().value;
			return buildFmpChild(
				gedcomChild,
				gedcomIdToFmpId,
				familyId,
				childId
			);
		}
	);

	return [
		fmpFamily,
		fmpChilds,
	];
};

module.exports = {
	buildFmpFamilyWithChilds,
};