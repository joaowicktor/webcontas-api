const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        birth_date: DataTypes.DATE,
        email: DataTypes.STRING,
        password: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }
}

module.exports = User;
