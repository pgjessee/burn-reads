'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Kindling_Shelves', [
      {
        shelf_name: 'Currently Torching',
        user_id: 1,
        createdAt: '2021-1-31', updatedAt: '2021-1-31'
      },
      {
        shelf_name: 'Torched',
        user_id: 1,
        createdAt: '2021-1-31', updatedAt: '2021-1-31'
      },
      {
        shelf_name: 'Want to Torch',
        user_id: 1,
        createdAt: '2021-1-31', updatedAt: '2021-1-31'
      },
      {
        shelf_name: 'Currently Torching',
        user_id: 2,
        createdAt: '2021-1-31', updatedAt: '2021-1-31'
      },
      {
        shelf_name: 'Torched',
        user_id: 2,
        createdAt: '2021-1-31', updatedAt: '2021-1-31'
      },
      {
        shelf_name: 'Want to Torch',
        user_id: 2,
        createdAt: '2021-1-31', updatedAt: '2021-1-31'
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Kindling_Shelves', null, {});

  }
};
