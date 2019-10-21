import * as Yup from 'yup';
import Turma from '../models/Turma';

class TurmaController {
  async index(req, res) {
    const turmas = await Turma.findAll({
      attributes: ['id', 'nome'],
    });

    return res.json(turmas);
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
