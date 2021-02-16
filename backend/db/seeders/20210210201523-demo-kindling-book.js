'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Kindling_Books', [
      {
        kindling_shelf_id: 1,
        book_id: 1,
      },
      {
        kindling_shelf_id: 2,
        book_id: 2,
      },
      {
        kindling_shelf_id: 3,
        book_id: 3,
      },
      {
        kindling_shelf_id: 1,
        book_id: 4,
      },
      {
        kindling_shelf_id: 1,
        book_id: 5,
      },
      {
        kindling_shelf_id: 1,
        book_id: 6,
      },
      {
        kindling_shelf_id: 2,
        book_id: 7,
      },
      {
        kindling_shelf_id: 2,
        book_id: 8,
      },
      {
        kindling_shelf_id: 3,
        book_id: 9,
      },
      {
        kindling_shelf_id: 3,
        book_id: 10,
      },
      {
        kindling_shelf_id: 4,
        book_id: 1,
      },
      {
        kindling_shelf_id: 5,
        book_id: 2,
      },
      {
        kindling_shelf_id: 5,
        book_id: 3,
      },      {
        kindling_shelf_id: 6,
        book_id: 4,
      },
      {
        kindling_shelf_id: 6,
        book_id: 5,
      },
      {
        kindling_shelf_id: 6,
        book_id: 6,
      },
      {
        kindling_shelf_id: 4,
        book_id: 7,
      },
      {
        kindling_shelf_id: 4,
        book_id: 8,
      },
      {
        kindling_shelf_id: 5,
        book_id: 9,
      },
      {
        kindling_shelf_id: 6,
        book_id: 10,
      },
      {
        kindling_shelf_id: 1,
        book_id: 11,
      },
      {
        kindling_shelf_id: 7,
        book_id: 11,
      },
      {
        kindling_shelf_id: 2,
        book_id: 12,
      },
      {
        kindling_shelf_id: 8,
        book_id: 12,
      },
      {
        kindling_shelf_id: 3,
        book_id: 13,
      },
      {
        kindling_shelf_id: 9,
        book_id: 13,
      },
      {
        kindling_shelf_id: 1,
        book_id: 14,
      },
      {
        kindling_shelf_id: 7,
        book_id: 14,
      },
      {
        kindling_shelf_id: 2,
        book_id: 15,
      },
      {
        kindling_shelf_id: 8,
        book_id: 15,
      },
      // {
      //   kindling_shelf_id: 3,
      //   book_id: 16,
      // },
      // {
      //   kindling_shelf_id: 9,
      //   book_id: 16,
      // },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Kindling_Books', null, {});

  }
};
