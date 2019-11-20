const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { name, birthDate, email, password } = req.body;

    const user = await User.create({ name, birth_date: birthDate, email, password });

    return res.json(user);
  }
};
