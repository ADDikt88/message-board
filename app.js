const express = require("express");
const app = express();

const fs = require("fs");
const url = require("url");
const path = require("node:path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
//set up middleware parser
app.use(express.urlencoded({ extended: true }));

//set up routers
const indexRouter = require("./routes/indexRouter");

app.use("/", indexRouter);

//set up views
//set views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mini message board - listening on port ${PORT}!`);
});
