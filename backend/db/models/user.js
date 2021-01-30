'use strict';
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256]
      }
    },
    zip: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: {notEmpty: true, len: [5,5]}
    },
    hashed_password: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {len: [60,60]}
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["hashed_password", "email", "createdAt", "updatedAt"]
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashed_password"] },
      },
      loginUser: {
        attributes: {}
      }
    }
  }, {});

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, email } = this; // context will be the User instance
    return { id, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashed_password.toString());
   };

   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };

   User.login = async function ({ credential, password }) {
    const user = await User.scope('loginUser').findOne({
      where: {
        email: credential
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ first_name, email, zip, password }) {
    const hashed_password = bcrypt.hashSync(password);
    const user = await User.create({
      first_name,
      email,
      zip,
      hashed_password,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
