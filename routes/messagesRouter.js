// routes/messagesRouter2.js
const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const messagesRouter = Router();

messagesRouter.get("/", messagesController.messagesListGet);
messagesRouter.get("/new", messagesController.messagesCreateGet);
messagesRouter.post("/new", messagesController.messagesCreatePost);

//messagesRouter.get("/edit/:id", messagesController.messagesUpdateGet);
//messagesRouter.post("/edit/:id", messagesController.messagesUpdatePost);

messagesRouter.post("/delete/:id", messagesController.messagesDeletePost);

module.exports = messagesRouter;
