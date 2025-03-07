const express = require("express");
const router = express.Router();
const {
  getPurchases,
  getPurchaseByID,
  createPurchase,
//   updateCar,
//   deleteCar,
} = require("../controllers/purchasesController");

router.get("/", getPurchases);
router.get("/:id", getPurchaseByID);
router.post("/", createPurchase);
// router.put("/:id", updateCar);
// router.delete("/:id", deleteCar);

module.exports = router;