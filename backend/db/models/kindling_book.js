'use strict';
module.exports = (sequelize, DataTypes) => {
	const Kindling_Book = sequelize.define(
		'Kindling_Book',
		{
			kindling_shelf_id: {
				type: DataTypes.INTEGER,
				references: { model: 'Kindling_Shelves' },
				allowNull: false,
			},
			book_id: {
				type: DataTypes.INTEGER,
				references: { model: 'Books' },
				allowNull: false,
			},
		},
		{}
	);

	Kindling_Book.associate = function (models) {
		Kindling_Book.belongsTo(models.Book, { foreignKey: 'book_id' });
		Kindling_Book.belongsTo(models.Kindling_Shelf, { foreignKey: 'kindling_shelf_id' });
	};
	return Kindling_Book;
};
