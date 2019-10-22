import * as Yup from 'yup';
import Turma from '../models/Turma';
import User from '../models/User';

class TurmaController {
  async index(req, res) {
    const turmas = await Turma.findAll({
      attributes: ['id', 'nome'],
    });

    return res.json(turmas);
  }

  async getById(req, res) {
    const { id, nome } = await Turma.findByPk(req.params.id);
    return res.json({
      id,
      nome,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const turmaExists = await Turma.findOne({
      where: { nome: req.body.nome },
    });
    if (turmaExists) {
      return res.status(400).json({ error: 'Turma already exists.' });
    }

    const { id, nome } = await Turma.create(req.body);

    return res.json({
      id,
      nome,
    });
  }

  async delete(req, res) {
    const turmaBound = await User.findOne({
      where: { turma_id: req.params.id },
    });

    if (turmaBound) {
      return res.json({ excluido: false });
    }

    await Turma.destroy({
      where: { id: req.params.id },
    });
    return res.json({ excluido: true });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { nome } = req.body;
    const turma = await Turma.findByPk(req.body.id);
    if (nome !== turma.nome) {
      const turmaExists = await Turma.findOne({ where: { nome } });

      if (turmaExists) {
        return res.status(400).json({ error: 'Turma already exists.' });
      }
    }

    const { id } = await turma.update(req.body);

    return res.json({
      id,
      nome,
    });
  }
}

export default new TurmaController();
