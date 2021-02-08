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
	Kindling_Shelf.associate = function (models) {
		Kindling_Shelf.belongsTo(models.User, { foreignKey: 'user_id' });
	};
	return Kindling_Shelf;
};
