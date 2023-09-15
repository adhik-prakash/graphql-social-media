import { dbConfig } from "./index";
import { Sequelize, Dialect } from "sequelize";

const { username, password, host, database, dialect } = dbConfig.development;

const sequelize = new Sequelize(database!, username!, password, {
  host: host,
  dialect: dialect as Dialect,
});

export default sequelize;
