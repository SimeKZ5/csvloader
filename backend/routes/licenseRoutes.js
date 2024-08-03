const express = require("express");

const {
  getLicenses,
  getLicensesById,
  createLicense,
  deleteLicense,
  authorizeLicense,
  checkDeviceRegistration,
} = require("../controllers/licensesControllers");
const isDeviceRegistered = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getLicenses);
router.get("/:id", getLicensesById);
router.post("/", createLicense);
router.delete("/:licenseKey", deleteLicense);

// autorizacija
router.post("/authorize/:licenseKey", authorizeLicense);

// registracija uredaja
router.post("/check-device", checkDeviceRegistration);

router.get("/csv-loader", isDeviceRegistered, (req, res) => {
  res.json({ message: "Welcome to the CSVLoader" });
});

module.exports = router;
