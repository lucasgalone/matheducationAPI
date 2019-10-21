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

  // async update(req, res) {
  //   const schema = Yup.object().shape({
  //     nome: Yup.string(),
  //     email: Yup.string().email(),
  //     oldPassword: Yup.string().min(6),
  //     password: Yup.string()
  //       .min(6)
  //       .when('oldPassword', (oldPassword, field) =>
  //         oldPassword ? field.required() : field
  //       ),
  //     confirmPassword: Yup.string().when('password', (password, field) =>
  //       password ? field.required().oneOf([Yup.ref('password')]) : field
  //     ),
  //   });

  //   if (!(await schema.isValid(req.body))) {
  //     return res.status(400).json({ error: 'Validation fails' });
  //   }

  //   const { email, oldPassword } = req.body;

  //   const user = await User.findByPk(req.userId);

  //   if (email !== user.email) {
  //     const userExists = await User.findOne({ where: { email } });

  //     if (userExists) {
  //       return res.status(400).json({ error: 'User already exists.' });
  //     }
  //   }

  //   if (!(await user.checkPassword(oldPassword))) {
  //     return res.status(401).json({ error: 'Password does not match' });
  //   }

  //   await user.update(req.body);

  //   const { id, nome, avatar } = await User.findByPk(req.userId, {
  //     include: [
  //       {
  //         model: File,
  //         as: 'avatar',
  //         attributes: ['id', 'path', 'url'],
  //       },
  //     ],
  //   });

  //   return res.json({
  //     id,
  //     nome,
  //     email,
  //     avatar,
  //   });
  // }
}

export default new StudentController();
