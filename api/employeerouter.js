import express from "express";
import { getEmployees, addEmployees } from "#db/employees";

const router = express.Router();

router.route("/").get((req, res) => {
  const employees = getEmployees();
  res.json(employees); 
});

router.route("/:id").get((req, res) => {
  const employees = getEmployees();
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

router.post("/", (req, res) => { 
  const employees = getEmployees();
  const name = req.body?.name;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Valid name is required" });
  }

  const newEmployee = {
    id: Math.max(0, ...employees.map((e) => e.id)) + 1,
    name: name.trim(),
  };

  employees.push(newEmployee);
  addEmployees(newEmployee);
  res.status(201).json(newEmployee);
});

export default router;
