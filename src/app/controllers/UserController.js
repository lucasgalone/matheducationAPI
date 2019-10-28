import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, email, teacher } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      teacher,
    });
  }

  async getById(req, res) {
    const { id, nome, score } = await User.findByPk(req.params.id);
    return res.json({
      id,
      nome,
      score,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    if (req.body.score) {
      if (req.body.score === 1) {
        req.body.score = user.score + 2;
      } else if (req.body.score === 2) {
        req.body.score = user.score + 4;
      } else {
        req.body.score = user.score + 6;
      }
    }

    await user.update(req.body);

    const { id, nome, avatar, score } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      nome,
      email,
      avatar,
      score,
    });
  }
}

export default new UserController();
