const express = require("express");
const router = express.Router();

// Citation for the following code:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app
const {
  getPurchases,
  getPurchaseByID,
  createPurchase,
  updatePurchase,
//   deletePurchase,
} = require("../controllers/purchasesController");

router.get("/", getPurchases);
router.get("/:id", getPurchaseByID);
router.post("/", createPurchase);
router.put("/:id", updatePurchase);
// router.delete("/:id", deletePurchase);

module.exports = router;