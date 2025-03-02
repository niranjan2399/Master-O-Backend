const express = require("express");
const router = express.Router();
const {
  startGame,
  stopGame,
  trackEvent,
  updateCheckpointScore,
} = require("../controllers/gameController");

router.post("/start", startGame);
router.post("/stop", stopGame);
router.post("/trackEvent", trackEvent);
router.post("/update-score", updateCheckpointScore);

module.exports = router;
