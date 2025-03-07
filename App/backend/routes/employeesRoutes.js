const express = require("express");
const router = express.Router();
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