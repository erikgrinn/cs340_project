const express = require("express");
const router = express.Router();
const {
  getPurchases,
  getPurchaseByID,
//   createCar,
//   updateCar,
//   deleteCar,
} = require("../controllers/purchasesController");

router.get("/", getPurchases);
router.get("/:id", getPurchaseByID);
// router.post("/", createCar);
// router.put("/:id", updateCar);
// router.delete("/:id", deleteCar);

module.exports = router;