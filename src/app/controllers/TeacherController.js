import User from '../models/User';
import File from '../models/File';

class TeacherController {
  async index(req, res) {
    const teachers = await User.findAll({
      where: { teacher: true },
      attributes: ['id', 'nome', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['nome', 'path', 'url'],
        },
      ],
    });

    return res.json(teachers);
  }
}

export default new TeacherController();
