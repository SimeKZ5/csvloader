const License = require("../models/licensesSchema");

const getLicenses = async (req, res) => {
  try {
    const licenses = await License.find();
    res.json(licenses);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getLicensesById = async (req, res) => {
  try {
    const license = await License.findById(req.params.id);
    if (!license) return res.status(404).json({ message: "License not found" });
    res.json(license);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  getLicenses,
  getLicensesById,
};
