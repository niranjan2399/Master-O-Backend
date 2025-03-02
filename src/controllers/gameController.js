const {
  createSession,
  endSession,
  updateMoveCount,
  updateScore,
} = require("../models/gameSession");
const { logEvent } = require("../models/gameEvent");

module.exports = {
  startGame: (req, res) => {
    createSession((err, sessionId) => {
      if (err)
        return res.status(500).json({ error: "Failed to start game session" });

      res.json({ message: "Game started", sessionId });
    });
  },

  stopGame: (req, res) => {
    const { sessionId } = req.body;
    endSession(sessionId, (err) => {
      if (err) return res.status(500).json({ error: "Failed to end session" });
      res.json({ message: "Game stopped" });
    });
  },

  trackEvent: (req, res) => {
    const { sessionId, event } = req.body;
    if (!["left", "right", "up"].includes(event)) {
      return res.status(400).json({ error: "Invalid event type" });
    }

    logEvent(sessionId, event, (err) => {
      if (err) return res.status(500).json({ error: "Failed to log event" });

      updateMoveCount(sessionId, () => {
        res.json({ message: "Event recorded" });
      });
    });
  },

  updateCheckpointScore: (req, res) => {
    const { sessionId } = req.body;
    if (!sessionId)
      return res.status(400).json({ error: "Session Id is required" });

    updateScore(sessionId, () => {
      res.json({ message: "Checkpoint score updated" });
    });
  },
};
