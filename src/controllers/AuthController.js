const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/User');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        success: false,
        msg: 'Dados inconsistentes'
      })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.send({
        success: false,
        msg: 'Usuário não encontrado'
      })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.send({
        success: false,
        msg: 'E-mail/senha inválidos'
      })
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400 })

    return res.send({
      success: true,
      userId: user.id,
      token
    });
  },
  async validateToken (req, res) {
    await jwt.verify(req.body.authToken, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          msg: 'Token inválido'
        })
      }
      return res.send({
        success: true,
        userId: decoded.id
      })
    })
  }
};
