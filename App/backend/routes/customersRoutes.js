const express = require("express");
const router = express.Router();

// Citation for the following code:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const {
  getCustomers,
  getCustomerByID,
  createCustomer,
  updateCustomersPurchases,
  deleteCustomersPurchases,
} = require("../controllers/customersController");

console.log("Loading customers routes...");

// Defines what happens when requst to path /api/customers/, /api/customers/123. Defines endpoints /, /123.
router.get("/", getCustomers);
router.get("/:id", getCustomerByID);
// When post request, call createCustomerfunction
router.post("/", createCustomer);
// router.put("/:id", updateCustomersPurchases);
// router.delete("/:id", deleteCustomersPurchases);

console.log("Customers routes loaded.");
module.exports = router;