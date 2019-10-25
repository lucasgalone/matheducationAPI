import { Model, Sequelize } from 'sequelize';

class ContaTurma extends Model {
  static init(sequelize) {
    super.init(
      {
        idturma: Sequelize.INTEGER,
        idconta: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default ContaTurma;
