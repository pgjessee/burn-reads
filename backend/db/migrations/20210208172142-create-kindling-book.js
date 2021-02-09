'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Kindling_Books', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			kindling_shelf_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Kindling_Shelves' },
			},
			book_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: 'Books' },
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Kindling_Books');
	},
};
