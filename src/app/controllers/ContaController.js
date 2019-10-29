import Conta from '../models/Conta';

class ContaController {
  async store(req, res) {
    const { id, conta } = await Conta.create(req.body);

    return res.json({
      id,
      conta,
    });
  }

  async delete(req, res) {
    await Conta.destroy({
      where: { id: req.params.id },
    });
    return res.json();
  }
}

export default new ContaController();
