const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "mysql://ugy1s0apl0t6n9hv:1B8pPwK1yLyhmZr84com@bkrit7vdod3nrci8yu2t-mysql.services.clever-cloud.com:3306/bkrit7vdod3nrci8yu2t"
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
