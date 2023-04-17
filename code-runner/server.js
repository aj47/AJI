const express = require("express");
const { exec } = require("node:child_process");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ extended: true, limit: "1mb" }));
const port = 4200;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/execute", (req, res) => {
  // console.log(req);
  console.log("running command: ", req.body.command);
  exec(req.body.command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.send(`stderr: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.send(`stdout: ${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
