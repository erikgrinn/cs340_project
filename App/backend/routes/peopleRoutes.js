const express = require("express");
const router = express.Router();

// Citation for the following code:
// Date: 02/26/2025
// Based on: CS 340 Starter Code, not used and kept for reference
// Source URL: https://github.com/osu-cs340-ecampus/react-starter-app

const {
  getPeople,
  getPersonByID,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/peopleController");

router.get("/", getPeople);
router.get("/:id", getPersonByID);
router.post("/", createPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
