const { Router } = require("express");

const indexRouter = Router();

const messages = [
    {
        id: 0,
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        id: 1,
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

indexRouter.get("/", (req, res) => {
    res.render("index", { title: "Mini Message Board", messages: messages });
});

indexRouter.get("/new", (req, res) => {
    res.render("form", { title: "New Message" });
});

indexRouter.get("/message/:id", (req, res) => {
    const message = messages.find(m => m.id === parseInt(req.params.id));
    if (message) {
        res.render("details", { title: "Message Details", message: message });
    } else {
        res.status(404).send("Message not found");
    }
});

indexRouter.post("/new", (req, res) => {
    const { messageUser, messageText } = req.body;
    const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 0;
    messages.push({ id: newId, text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
});

module.exports = indexRouter;
