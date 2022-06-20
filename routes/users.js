const express = require("express");
const router = express.Router();
const data = require("./../data/users");

router.get("/", async function (req, res, next) {
  const users = await data.getAllUsers();
  res.json(users);
});

router.post("/", async (req, res) => {
  const user = req.body;
  const result = await data.addUser(user);
  res.status(201).json(result);
});

router.post("/login", async (req, res) => {
  try {
    const user = await data.findByCredential(req.body.email, req.body.password);
    const token = data.generateToken(user);
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
});
module.exports = router;
