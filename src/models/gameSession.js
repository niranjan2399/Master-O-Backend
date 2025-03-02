const db = require("../config/db");

const createSession = (callback) => {
  const query = "INSERT INTO GameSession (start_time) VALUES (NOW())";
  db.query(query, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.insertId);
  });
};

const endSession = (sessionId, callback) => {
  const query = `UPDATE GameSession 
                 SET end_time = NOW(), 
                     duration = TIMESTAMPDIFF(SECOND, start_time, NOW()) 
                 WHERE id = ?`;
  db.query(query, [sessionId], callback);
};

const updateMoveCount = (sessionId, callback) => {
  const query = `UPDATE GameSession SET total_moves = total_moves + 1 WHERE id = ?`;
  db.query(query, [sessionId], callback);
};

const updateScore = (sessionId, callback) => {
  const query = `UPDATE GameSession SET score = score + 1 WHERE id = ?`;
  db.query(query, [sessionId], callback);
};

module.exports = {
  createSession,
  endSession,
  updateMoveCount,
  updateScore,
};
