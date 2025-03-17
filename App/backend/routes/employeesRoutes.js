const express = require("express");
const router = express.Router();

// Citation for the following code:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const {
  getEmployees,
  getEmployeeByID,
  createEmployee,
  updateEmployeesPurchases,
  deleteEmployeesPurchases,
} = require("../controllers/employeesController");

console.log("Loading Employees routes...");

// Defines what happens when requst to path /api/Employees/, /api/Employees/123. Defines endpoints /, /123.
router.get("/", getEmployees);
router.get("/:id", getEmployeeByID);
// When post request, call createEmployeefunction
router.post("/", createEmployee);
// router.put("/:id", updateEmployeesPurchases);
// router.delete("/:id", deleteEmployeesPurchases);

console.log("Employees routes loaded.");
module.exports = router;