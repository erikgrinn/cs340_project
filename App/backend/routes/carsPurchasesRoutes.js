const express = require("express");
const router = express.Router();

// Citation for the following code:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const {
  getCarsPurchases,
  getCarsPurchaseByID,
  createCarsPurchases,
  updateCarsPurchases,
  deleteCarsPurchases,
} = require("../controllers/carsPurchasesController");

router.get("/", getCarsPurchases);
router.get("/:id", getCarsPurchaseByID);
router.post("/", createCarsPurchases);
router.put("/:id", updateCarsPurchases);
router.delete("/:id", deleteCarsPurchases);

module.exports = router;