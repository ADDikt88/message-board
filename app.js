const express = require("express");
const app = express();

const fs = require("fs");
const url = require("url");
const path = require("node:path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//set up routers
//const newmsgRouter = require("./routes/newmsgRouter");
const indexRouter = require("./routes/indexRouter");

//app.use("/newMessage", newmsgRouter);
app.use("/", indexRouter);

//links variables
const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New Message" },
];

//set up views
//set views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Mini message board - listening on port ${PORT}!`);
});
