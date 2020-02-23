const Category = require('../models/Category');

module.exports = {
  async create(req, res) {
    const { name, type } = req.body;
    try {
      await Category.create({ name, type });

      return res.send({
        success: true,
        msg: 'Categoria cadastrada com sucesso!'
      });
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        success: false,
        msg: 'Erro ao tentar cadastrar uma nova categoria'
      })
    }
  },
  async listByType(req, res) {
    const { type } = req.query;
    console.log(req.query);
    try {
      const categories = await Category.findAll({ where: { type } });
      return res.send(categories);
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'Nenhuma categoria encontrada'
      })
    }
  },
  async getById(req, res) {
    const { categoryId } = req.params;
    try {
      const category = await Category.findByPk(categoryId);
      return res.send(category);
    } catch (err) {
      return res.status(400).send({
        success: false,
        msg: 'Nenhuma categoria encontrada'
      })
    }
  }
};
