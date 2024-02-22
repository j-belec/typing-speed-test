const express = require("express");
const app = express();
const path = require("path");
const appRoutes = require("./src/routes/appRoutes");

//static public folder
app.use(express.static(path.join(__dirname, "./public")));

//ejs
app.set("view engine", "ejs");
app.set("views", "./src/views");

//routes
app.use("/", appRoutes);

//server
app.listen(3000, () => {
  console.log("servidor corriendo");
});
