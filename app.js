import express, { json } from "express";
import Calculation from "./modules/calculation.js";

const app = express();
const port = 3310;

app.use(json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/analyse", (req, res) => {
  res.send(new Calculation().callSizeAndQuantity());
});

app.post("/clean", (req, res) => {
  new Calculation(req.body).callClean();
  res.send("everything was cleaned");
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on port ${port}`);
});
