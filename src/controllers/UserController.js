const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;
    try {
      if (await User.findOne({ where: { email } })) {
        return res.send({
          success: false,
          msg: 'Já existe um usuário cadastrado com esse e-mail'
        })
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      await User.create({ name, email, password: encryptedPassword });

      return res.send({
        success: true,
        msg: 'Usuário cadastrado com sucesso!'
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        msg: 'Erro ao tentar salvar o usuário'
      })
    }
  },
  async getById(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
      return res.send(user);
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'Nenhum usuário encontrado'
      })
    }
  }
};
