module.exports = {
  dialect: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
