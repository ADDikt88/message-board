// controllers/messagesController.js

const db = require("../db/queries");

//links variables
const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New Message" },
];

async function messagesListGet(req, res) {
  console.log("messages will be logged here");

  const messages = await db.getAllMessages();
  console.log("messages: ", messages);

  res.render("index", {
    title: "Mini Message Board",
    messages: messages,
    links: links,
  });
}

async function messagesCreateGet(req, res) {
  res.render("form", {
    title: "Post New Message",
  });
}

async function messagesCreatePost(req, res) {
  console.log("message posted by: ", req.body.userName);
  console.log("message to be saved: ", req.body.newMessage);

  await db.insertNewMessage(req.body.userName, req.body.newMessage);
  res.redirect("/");
}

async function messagesDeletePost(req, res) {
  console.log("deleting message id: ", req.params.id);
  await db.deleteMessage(req.params.id);
  res.redirect("/");
}

async function messagesUpdateGet(req, res) {
  console.log("editing message id: ", req.params.id);
  const msgEdit = await db.getMessage(req.params.id);
  console.log("retrieved message: ", msgEdit);
  res.render("edit", {
    title: "Edit message",
    message: msgEdit[0],
  });
}

async function messagesUpdatePost(req, res) {
  const { userName, messageText } = req.body;
  const userID = req.params.id;
  await db.updateMessage(userID, userName, messageText);
  res.redirect("/");
}

module.exports = {
  messagesListGet,
  messagesCreateGet,
  messagesCreatePost,
  messagesDeletePost,
  messagesUpdateGet,
  messagesUpdatePost,
};
