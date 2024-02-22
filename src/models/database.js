const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("typing-test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  (async function () {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  })();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
