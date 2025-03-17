const express = require("express");
const router = express.Router();

// Citation for the following code:
// Date: 02/26/2025
// Based on: CS 340 Starter Code
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const {
  getDealerships,
  getDealershipByID,
  createDealership,
  updateDealership,
  deleteDealership,
} = require("../controllers/dealershipsController");

router.get("/", getDealerships);
router.get("/:id", getDealershipByID);
router.post("/", createDealership);
router.put("/:id", updateDealership);
router.delete("/:id", deleteDealership);

module.exports = router;