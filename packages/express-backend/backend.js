// backend.js
import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((err) => res.status(500).send(err.message));
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
        return;
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send(err.message));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService
    .addUser(userToAdd)
    .then((createdUser) => res.status(201).send(createdUser))
    .catch((err) => res.status(400).send(err.message));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .deleteUserById(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("User not found.");
        return;
      }
      res.status(204).send();
    })
    .catch((err) => res.status(500).send(err.message));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
