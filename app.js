import express from "express";
const app = express();
export default app;

import employeeRouter from "./api/employeerouter.js";

app.use(express.json()); 
app.use("/employees", employeeRouter);

app.get("/", (req, res) => {
  res.send("Welcome Employees!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry, try again later.");
});