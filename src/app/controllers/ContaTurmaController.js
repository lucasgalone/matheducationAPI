import ContaTurma from '../models/ContaTurma';
import User from '../models/User';
import Conta from '../models/Conta';
import Turma from '../models/Turma';

class ContaTurmaController {
  async index(req, res) {
    const turmas = await Turma.findAll({ attributes: ['id', 'nome'] });
    const contas = await Conta.findAll({ attributes: ['id', 'conta'] });
    const contaTurma = await ContaTurma.findAll({
      attributes: ['id', 'idturma', 'idconta'],
    });

    return res.json({ turmas, contas, contaTurma });
  }

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
    const existVinc = await ContaTurma.findOne({
      where: { idturma: req.body.idturma, idconta: req.body.idconta },
    });

    if (existVinc) {
      const respDelete = await ContaTurma.destroy({
        where: { id: existVinc.id },
      });
      return res.json(respDelete);
    }
    const resp = await ContaTurma.create(req.body);
    return res.json(resp);
  }
}
export default new ContaTurmaController();
