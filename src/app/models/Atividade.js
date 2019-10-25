import { Model, Sequelize } from 'sequelize';

class Atividade extends Model {
  static init(sequelize) {
    super.init(
      {
        idtipoconta: Sequelize.INTEGER,
        nivel: Sequelize.INTEGER,
        r1: Sequelize.INTEGER,
        r2: Sequelize.INTEGER,
        r3: Sequelize.INTEGER,
        r4: Sequelize.INTEGER,
        resposta: Sequelize.INTEGER,
        descricao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Atividade;
