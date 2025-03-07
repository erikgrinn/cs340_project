const express = require("express");
const router = express.Router();
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