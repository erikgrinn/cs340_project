const express = require("express");
const router = express.Router();
const {
  getCars,
  getCarByID,
  createCar,
//   updateCar,
//   deleteCar,
} = require("../controllers/carsController");

router.get("/", getCars);
router.get("/:id", getCarByID);
router.post("/", createCar);
// router.put("/:id", updateCar);
// router.delete("/:id", deleteCar);

module.exports = router;