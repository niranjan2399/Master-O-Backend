const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const gameRoutes = require("./routes/gameRoutes");
const reportRoutes = require("./routes/reportRoutes");

const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "https://master-o-car-race-game.netlify.app",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/game", gameRoutes);
app.use("/report", reportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
