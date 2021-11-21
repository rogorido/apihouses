const initOptions = {};
const pgp = require("pg-promise")(initOptions);

username = process.env.PG_USER;
password = process.env.PG_PASSWORD;
pgport = process.env.PGPORT;

const db = pgp(
  `postgres://${username}:${password}@localhost:${pgport}/dominicos`
);

const monitor = require("pg-monitor");
monitor.attach(initOptions);

const { FilterSetGeneral, FilterSetProvinces, readSQL } = require("./helpers");

// Es necesario crearlo aquí globalmente y no en la función concreta
// por no sé cuestión interna...
// const sqlFindWork = readSQL("./sql/works.sql");

const sqlGeneralData = readSQL("../sql/houses_map.sql");
1;
const sqlProvinces = readSQL("../sql/provinces.sql");
const sqlProvincesStats = readSQL("../sql/capgens_provinces_stats.sql");

async function getGeneralData(req, res) {
  const housesList = await db.query(sqlGeneralData);

  res.send(housesList);
}

async function getProvinces(req, res) {
  const rowList = await db.query(sqlProvinces);
  res.send(rowList);
}

module.exports = {
  getGeneralData,
  getProvinces,
};
