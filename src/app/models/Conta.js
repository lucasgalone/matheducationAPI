import { Model, Sequelize } from 'sequelize';

class Conta extends Model {
  static init(sequelize) {
    super.init(
      {
        conta: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Turma, {
      through: 'conta_turmas',
      as: 'turmas',
      foreignKey: 'idconta',
      otherKey: 'idturma',
    });
  }
}

export default Conta;
