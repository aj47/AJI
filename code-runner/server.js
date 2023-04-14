const express = require("express");
const { exec } = require("node:child_process");
const app = express();
const port = 4200;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/execute", (req, res) => {
  exec('echo console.log("Hello World"); > helloworld.js"', () => {
    exec("node helloworld.js", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      res.send(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
