'use strict';
module.exports = (sequelize, DataTypes) => {
  const Burn = sequelize.define('Burn', {
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {});
  Burn.associate = function(models) {
    Burn.belongsTo(models.Book, { foreignKey: "book_id" })
    Burn.belongsTo(models.User, { foreignKey: "user_id" })
  };
  return Burn;
};
