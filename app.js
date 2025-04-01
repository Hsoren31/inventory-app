const express = require("express");
const app = express();

const gameRouter = require("./router/gameRouter");

app.use("/games", gameRouter);
app.get("/", (req, res) => res.send("hello world!"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app listening to port ${PORT}!`);
});
