module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'turma_id', {
      type: Sequelize.INTEGER,
      references: { model: 'turmas', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'turma_id');
  },
};
