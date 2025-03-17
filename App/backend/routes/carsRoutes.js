const express = require("express");
const router = express.Router();

// Citation for the following code:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

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