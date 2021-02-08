'use strict';
module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define(
		'Book',
		{
			google_book_id: {
				type: DataTypes.STRING,
				unique: true,
			},
		},
		{}
	);

	const columnMapping = {
		through: 'Burn',
		otherKey: 'user_id',
		foreignKey: 'book_id',
	};

	Book.associate = function (models) {
		Book.hasMany(models.Burn, { foreignKey: 'book_id' });
		Book.belongsToMany(models.User, columnMapping);
		Book.hasMany(models.Kindling_Book, { foreignKey: 'book_id' });
	};
	return Book;
};
