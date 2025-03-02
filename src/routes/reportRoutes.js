const express = require("express");
const router = express.Router();
const {
  getDashboardReport,
  getCustomReport,
  exportCSV,
} = require("../controllers/reportController");

router.post("/custom", getCustomReport);
router.post("/export-csv", exportCSV);

module.exports = router;
