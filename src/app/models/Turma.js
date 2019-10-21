import { Model, Sequelize } from 'sequelize';

class Turma extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Turma;
