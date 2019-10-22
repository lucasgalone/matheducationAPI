import * as Yup from 'yup';
import User from '../models/User';
import Turma from '../models/Turma';

class StudentController {
  async index(req, res) {
    const students = await User.findAll({
      where: { teacher: false },
      attributes: ['id', 'nome', 'email'],
      include: [
        {
          model: Turma,
          as: 'turma',
          attributes: ['nome'],
        },
      ],
    });

    return res.json(students);
  }

  async getById(req, res) {
    const { id, nome, email } = await User.findOne({
      where: { teacher: false, id: req.params.id },
    });
    return res.json({
      id,
      nome,
      email,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      turma_id: Yup.number()
        .positive()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }
    const { id, nome, email, turma_id, teacher } = await User.create(req.body);

    return res.json({
      id,
      nome,
      email,
      turma_id,
      teacher,
    });
  }

  async delete(req, res) {
    await User.destroy({
      where: { id: req.params.id },
    });
    return res.json();
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string(),
      nome: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const user = await User.findByPk(req.body.id);

    if (email === user.email) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, nome, password } = await user.update(req.body);

    return res.json({
      id,
      nome,
      email,
      password,
    });
  }
}

export default new StudentController();
