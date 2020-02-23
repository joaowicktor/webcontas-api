const { Model, DataTypes } = require('sequelize');

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        opening_balance: DataTypes.DECIMAL(10,2)
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.Transaction, { foreignKey: 'account_id', as: 'transactions' });
  }
}

module.exports = Account;
