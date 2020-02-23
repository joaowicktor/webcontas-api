const { Model, DataTypes } = require('sequelize');

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        description: DataTypes.STRING,
        amount: DataTypes.DECIMAL(10,2),
        occurrence_date: DataTypes.DATEONLY,
        is_paid: DataTypes.BOOLEAN,
        is_expense: DataTypes.BOOLEAN
      },
      {
        sequelize
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Account, { foreignKey: 'account_id', as: 'account' });
    this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  }
}

module.exports = Transaction;
