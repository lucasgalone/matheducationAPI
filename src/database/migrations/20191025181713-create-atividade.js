module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('atividades', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idtipoconta: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nivel: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      r1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      r2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      r3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      r4: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resposta: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('atividades');
  },
};
