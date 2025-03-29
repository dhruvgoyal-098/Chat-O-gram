const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
const { saveUser, getUsers } = require("./models/data.mongodb.js");
const PORT = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    const users = await getUsers();
    res.render("index", { users });
});
app.post("/submit", async (req, res) => {
    const { name, message } = req.body;
    await saveUser(name, message);
    res.redirect("/");
});
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});