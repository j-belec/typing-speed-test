const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "mysql://root:TpFDCKWUpuRnzoMbNYZQpygTbUgcBMeF@viaduct.proxy.rlwy.net:47499/railway"
);

try {
  (async function () {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  })();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
