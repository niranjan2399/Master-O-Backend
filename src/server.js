const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const gameRoutes = require("./routes/gameRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use(cors());
app.use(express.json());

app.use("/game", gameRoutes);
app.use("/report", reportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
