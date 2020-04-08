const express = require("express"); // importing express framework

const server = express(); // creating server const with express framework

const blogRouter = require("../blog resources/blogRouter");

const cors = require("cors");

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  const query = req.query;
  console.log("query", query);

  res.status(200).json(query);
});

//make router handle endpoints starting with /api/posts
server.use("/api/posts", blogRouter);

module.exports = server;
