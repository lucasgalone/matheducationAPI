import ContaTurma from '../models/ContaTurma';
import User from '../models/User';
import Conta from '../models/Conta';
import Turma from '../models/Turma';

class ContaTurmaController {
  async getById(req, res) {
    const { turma_id } = await User.findByPk(req.params.id);

    const contaturma = await Turma.findAll({
      attributes: ['id', 'nome'],
      where: { id: turma_id },
      include: [
        {
          model: Conta,
          as: 'conta',
          required: false,
          attributes: ['id', 'conta'],
        },
      ],
    });

    const resposta = contaturma[0].conta.map(x => {
      return {
        id: x.id,
        conta: x.conta,
      };
    });

    return res.json(resposta);
  }

  async store(req, res) {
    const a = await ContaTurma.create(req.body);

    return res.json(a);
  }
}
export default new ContaTurmaController();
