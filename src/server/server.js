var projectData = {};
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");
const fetch = require("node-fetch");

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("*",  (req, res, next)=> {
  if (req.headers["x-forwarded-proto"] != "https") {
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/test",  (req, res)=> {
  res.send({
    title: "test json response",
    message: "testing mockApi",
    time: "now",
  });
});

app.get("/",  (req, res)=> {
  res.sendFile(path.resolve("dist/index.html"));
});

app.get("/all", sendData);
const sendData=(req, res)=> {
  res.send(projectData);
}

app.post("/callAPI", async (req, res) => {
  const apiUrl = req.body.urlBase;

  const resp = await fetch(apiUrl);

  try {
    const data = await resp.json();
    res.send(data);
  } catch (err) {
    console.log("error when calling API via server side", err);
  }
});

module.exports = app;
