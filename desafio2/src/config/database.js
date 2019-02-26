module.exports = {
  dialect: 'postgres',
  host: process.env.PG_HOST || '127.0.0.1',
  username: process.env.PG_USERNAME || 'docker',
  password: process.env.PG_PASSWORD || 'docker',
  database: process.env.PG_DATABASE || 'gonodedesafio2',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
