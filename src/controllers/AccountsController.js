const User = require('../models/User');
const Account = require('../models/Account');

module.exports = {
  async create(req, res) {
    const { name, opening_balance } = req.body;
    const { userId } = req.params;
    try {
      if (!await User.findByPk(userId)) {
        return res.status(400).send({
          success: false,
          msg: 'Usuário não encontrado'
        })
      }

      await Account.create({ name, opening_balance, user_id: userId });

      return res.send({
        success: true,
        msg: 'Conta cadastrada com sucesso!'
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        msg: 'Erro ao tentar cadastrar uma nova conta'
      })
    }
  },
  async update(req, res) {
    const { name, opening_balance } = req.body;
    const { accountId } = req.params;
    try {
      const account = await Account.findByPk(accountId);
      if (!account) {
        return res.status(400).send({
          success: false,
          msg: 'Conta não encontrada'
        })
      }

      await account.update({ 
        name: name || account.name,
        opening_balance: opening_balance || account.opening_balance
      });

      return res.send({
        success: true,
        msg: 'Conta atualizada com sucesso!'
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        msg: 'Erro ao tentar cadastrar uma nova conta'
      })
    }
  },
  async delete(req, res) {
    const { accountId } = req.params;
    try {
      const account = await Account.findByPk(accountId);
      if (!account) {
        return res.status(400).send({
          success: false,
          msg: 'Conta não encontrada'
        })
      }

      await account.destroy();

      return res.send({
        success: true,
        msg: 'Conta excluída com sucesso!'
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        msg: 'Erro ao tentar excluir a conta'
      })
    }
  },
  async list(req, res) {
    const { userId } = req.params;
    try {
      const accounts = await Account.findAll({where: {user_id: userId}});
      return res.send(accounts);
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'Nenhuma conta encontrada'
      })
    }
  },
  async getById(req, res) {
    const { accountId } = req.params;
    try {
      const account = await Account.findByPk(accountId);
      return res.send(account);
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'Nenhuma conta encontrada'
      })
    }
  }
};
