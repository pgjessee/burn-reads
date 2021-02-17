'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Books',
			[
				{
					google_book_id: 'AU9YtwAACAAJ',
				},
				{
					google_book_id: '37cti631AdUC',
				},
				{
					google_book_id: 'w5Gse7Me1c0C',
				},
				{
					google_book_id: 'r6eoCwAAQBAJ',
				},
				{
					google_book_id: 'FN5wMOZKTYMC',
				},
				{
					google_book_id: '-3rXnAEACAAJ',
				},
				{
					google_book_id: 's-vaDwAAQBAJ',
				},
				{
					google_book_id: 'kcsqGna7fBIC',
				},
				{
					google_book_id: '5NomkK4EV68C',
				},
				{
					google_book_id: 'ZfjzX7M8zt0C',
				},
				{
					google_book_id: '_ojXNuzgHRcC',
				},
				{
					google_book_id: 'RJxWIQOvoZUC',
				},
				{
					google_book_id: 'zaRoX10_UsMC',
				},
				{
					google_book_id: 'ha6GIYze5lEC',
				},
				{
					google_book_id: 'nkalO3OsoeMC',
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Books', null, {});
	},
};
