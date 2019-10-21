module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  port: 5433,
  database: 'matheducation',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
