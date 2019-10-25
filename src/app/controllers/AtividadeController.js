import Atividade from '../models/Atividade';

class AtividadeController {
  async getById(req, res) {
    const listAtividades = await Atividade.findAll({
      where: { idtipoconta: req.params.id },
      attributes: [
        'id',
        'idtipoconta',
        'nivel',
        'r1',
        'r2',
        'r3',
        'r4',
        'resposta',
        'descricao',
      ],
    });

    const resposta = listAtividades.map(x => {
      return {
        nivel: x.nivel,
        respostas: [x.r1, x.r2, x.r3, x.r4],
        resposta: x.resposta,
        descricao: x.descricao,
      };
    });

    return res.json(resposta);
  }

  async store(req, res) {
    const a = await Atividade.create(req.body);

    return res.json(a);
  }
}
export default new AtividadeController();
