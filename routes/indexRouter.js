const express = require("express");
const router = express.Router();

const messages = [
  {
    id: 0,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

//links variables
const links = [
  { href: "/", text: "Home" },
  { href: "new", text: "New Message" },
];

//handle get
router.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    links: links,
    messages: messages,
  });
});

//handle get for new msg
router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

//handle post for new msg
router.post("/new", (req, res) => {
  const { userName, messageText } = req.body;
  messages.push({
    id: messages.length,
    text: messageText,
    user: userName,
    added: new Date(),
  });
  res.redirect("/");
});

//handle get for edit msg
// Route to render the Edit form
router.get("/edit/:id", (req, res) => {
  const messageId = parseInt(req.params.id, 10);
  const message = messages.find((msg) => msg.id === messageId);

  if (!message) {
    return res.status(404).send("Message not found.");
  }

  res.render("edit", { message });
});

// Route to handle the Edit form submission
router.post("/edit/:id", (req, res) => {
  const messageId = parseInt(req.params.id, 10);
  const { userName, messageText } = req.body;

  const index = messages.findIndex((msg) => msg.id === messageId);

  if (index !== -1 && userName && messageText) {
    messages[index] = {
      id: messageId,
      text: messageText,
      user: userName,
      added: new Date(),
    };
    return res.redirect("/");
  }

  res.status(400).send("Invalid data or message not found.");
});

module.exports = router;
