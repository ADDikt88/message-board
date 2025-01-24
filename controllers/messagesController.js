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
  console.log("deleting message id: ", req.body.id);
  await db.deleteMessage();
  res.redirect("/");
}

module.exports = {
  messagesListGet,
  messagesCreateGet,
  messagesCreatePost,
  messagesDeletePost,
};
