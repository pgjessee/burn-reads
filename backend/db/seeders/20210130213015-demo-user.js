'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					first_name: 'Demo',
					email: 'demo@aa.io',
					zip: '74012',
					hashed_pass: bcrypt.hashSync('123'),
				},
				{
					first_name: 'Ned',
					email: 'ned@aa.io',
					zip: '12345',
					hashed_pass: bcrypt.hashSync('123'),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	},
};
