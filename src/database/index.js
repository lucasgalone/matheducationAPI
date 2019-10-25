import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Turma from '../app/models/Turma';
import Conta from '../app/models/Conta';
import ContaTurma from '../app/models/ContaTurma';
import Atividade from '../app/models/Atividade';

import databaseConfig from '../config/database';

const models = [User, File, Turma, Conta, ContaTurma, Atividade];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
