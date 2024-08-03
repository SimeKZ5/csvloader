const express = require("express");

const {
  getLicenses,
  getLicensesById,
} = require("../controllers/licensesControllers");
const router = express.Router();

router.get("/", getLicenses);
router.get("/:id", getLicensesById);

module.exports = router;
