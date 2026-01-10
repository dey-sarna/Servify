const authRoutes = require("./modules/auth/auth.routes");
const complaintRoutes = require("./modules/complaints/complaints.routes");
const adminRoutes = require("./modules/admin/admin.routes");


const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servify backend is running");
});
const pool = require("./config/db");

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ ok: true, result: rows[0].result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);


module.exports = app;
