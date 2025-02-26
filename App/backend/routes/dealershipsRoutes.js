const express = require("express");
const router = express.Router();
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