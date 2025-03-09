const express = require("express");
const router = express.Router();
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