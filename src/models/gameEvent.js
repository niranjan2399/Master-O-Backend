const db = require("../config/db");

const logEvent = (sessionId, eventType, callback) => {
  const query =
    "INSERT INTO GameEvent (session_id, event_type, timestamp) VALUES (?, ?, NOW())";
  db.query(query, [sessionId, eventType], callback);
};

module.exports = { logEvent };
