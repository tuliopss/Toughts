const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("toughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  sequelize.authenticate();
  console.log("MySQL conectado com sucesso!");
} catch (error) {
  console.log(error);
}

module.exports = sequelize;
