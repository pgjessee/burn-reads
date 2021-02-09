'use strict';
module.exports = (sequelize, DataTypes) => {
	const Kindling_Shelf = sequelize.define(
		'Kindling_Shelf',
		{
			shelf_name: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: { model: 'Users' },
				allowNull: false,
			},
		},
		{}
	);

	const columnMapping = {
		through: 'Kindling_Book',
		otherKey: 'book_id',
		foreignKey: 'kindling_shelf_id',
	};

	Kindling_Shelf.associate = function (models) {
		Kindling_Shelf.belongsTo(models.User, { foreignKey: 'user_id' });
		Kindling_Shelf.hasMany(models.Kindling_Book, { foreignKey: 'kindling_shelf_id' });
		Kindling_Shelf.belongsToMany(models.Book, columnMapping);
	};

	return Kindling_Shelf;
};
