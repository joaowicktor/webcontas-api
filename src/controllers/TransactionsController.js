const Sequelize = require('sequelize');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

module.exports = {
  async create(req, res) {
    const { description, amount, occurrence_date, category_id, account_id, is_paid, is_expense } = req.body;
    try {
      await Transaction.create({ description, amount, occurrence_date, category_id, account_id, is_paid, is_expense });

      return res.send({
        success: true,
        msg: `${!is_expense ? 'Receita' : 'Despesa'} cadastrada com sucesso!`
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        msg: 'Erro ao tentar realizar um novo lançamento'
      })
    }
  },
  async update(req, res) {
    const { transactionId } = req.params;
    try {
      const transaction = await Transaction.findByPk(transactionId);
      if (!transaction) {
        return res.status(400).send({
          success: false,
          msg: 'Lançamento não encontrado'
        })
      }
      
      await transaction.update({ 
        description: req.body.description || transaction.description,
        amount: req.body.amount || transaction.amount,
        occurrence_date: req.body.occurrence_date || transaction.occurrence_date,
        is_paid: req.body.is_paid,
        is_expense: req.body.is_expense,
        category_id: req.body.category_id || transaction.category_id,
        account_id: req.body.account_id || transaction.account_id
      }, { plain: true });

      return res.send({
        success: true,
        msg: `${!transaction.is_expense ? 'Receita' : 'Despesa'} atualizada com sucesso!`
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        msg: 'Erro ao tentar alterar o lançamento'
      })
    }
  },
  async delete(req, res) {
    const { transactionId } = req.params;
    try {
      const transaction = await Transaction.findByPk(transactionId);
      if (!transaction) {
        return res.status(400).send({
          success: false,
          msg: 'Lançamento não encontrado'
        })
      }

      await transaction.destroy();

      return res.send({
        success: true,
        msg: 'Lançamento excluído com sucesso!'
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        msg: 'Erro ao tentar excluir o lançamento'
      })
    }
  },
  async listByUser(req, res) {
    const { userId } = req.params;

    try {
      const accounts = await Account.findAll({ where: { user_id: userId } });
      if (!accounts) {
        return res.send({
          success: false,
          msg: 'Nenhum lançamento encontrado'
        })
      }

      let accounts_ids = [];
      accounts.forEach(account => accounts_ids.push(account.id));

      const transactions = await Transaction.findAll({
        where: {
          account_id: accounts_ids
        },
        include: ['category', 'account'],
        order: [
          ['occurrence_date', 'ASC'],
          ['description', 'ASC']
        ]
      });
      
      return res.send(transactions);
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'Nenhum lançamento encontrado'
      })
    }
  },
  async getById(req, res) {
    const { transactionId } = req.params;
    try {
      const transaction = await Transaction.findByPk(transactionId);
      return res.send(transaction);
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'Nenhum lançamento encontrado'
      })
    }
  },
  async getTransactionsAmount(req, res) {
    const { userId } = req.params;

    try {
      const accounts = await Account.findAll({ where: { user_id: userId } });
      if (!accounts) {
        return res.send({
          success: false,
          msg: 'Nenhum lançamento encontrado'
        })
      }

      let accounts_ids = [];
      accounts.forEach(account => accounts_ids.push(account.id));

      const paidTransactions = await Transaction.findAll({
        attributes: ['is_expense', [Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
        where: {
          account_id: accounts_ids,
          is_paid: true
        },
        group: ['is_expense'],
        order: [['is_expense', 'asc']]
      });

      const allTransactions = await Transaction.findAll({
        attributes: ['is_expense', [Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
        where: {
          account_id: accounts_ids
        },
        group: ['is_expense'],
        order: [['is_expense', 'asc']]
      });

      return res.send({paid: paidTransactions, all: allTransactions});
    } catch (err) {
      return res.send({
        success: false,
        msg: 'Nenhum lançamento encontrado'
      })
    }
  }
};
