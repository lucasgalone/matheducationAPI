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

  static associate(models) {
    this.belongsToMany(models.Conta, {
      through: 'conta_turmas',
      as: 'conta',
      foreignKey: 'idturma',
      otherKey: 'idconta',
    });
  }
}

export default Turma;
