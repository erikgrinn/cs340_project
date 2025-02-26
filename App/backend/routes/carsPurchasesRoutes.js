const express = require("express");
const router = express.Router();
const {
  getCarsPurchases,
  getCarsPurchaseByID,
  createCarsPurchases,
  // updateCarsPurchases,
  deleteCarsPurchases,
} = require("../controllers/carsPurchasesController");

router.get("/", getCarsPurchases);
router.get("/:id", getCarsPurchaseByID);
router.post("/", createCarsPurchases);
// router.put("/:id", updateCarsPurchases);
router.delete("/:id", deleteCarsPurchases);

module.exports = router;