const db = require("../config/db");
const { Parser } = require("json2csv");
const fs = require("fs");

module.exports = {
  getCustomReport: (req, res) => {
    const { metrics } = req.body;
    if (!metrics?.length)
      return res.status(400).json({ error: "Select at least one metric" });

    const query = `SELECT ${metrics.join(", ")} FROM GameSession LIMIT 15`;

    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ sessions: results });
    });
  },

  exportCSV: (req, res) => {
    const { metrics } = req.body;
    const query = `SELECT ${metrics.join(", ")} FROM GameSession`;

    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      const parser = new Parser({ fields: metrics });
      const csv = parser.parse(results);
      fs.writeFileSync("report.csv", csv);

      res.download("report.csv");
    });
  },
};
