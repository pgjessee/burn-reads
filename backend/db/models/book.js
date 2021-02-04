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
	Book.associate = function (models) {
		// associations can be defined here
	};
	return Book;
};
