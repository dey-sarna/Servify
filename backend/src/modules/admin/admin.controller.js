const pool = require("../../config/db");

// Dashboard overview
exports.overview = async (req, res) => {
  try {
    const [[total]] = await pool.query("SELECT COUNT(*) total FROM complaints");
    const [[pending]] = await pool.query(
      "SELECT COUNT(*) total FROM complaints WHERE status='pending'"
    );
    const [[resolved]] = await pool.query(
      "SELECT COUNT(*) total FROM complaints WHERE status='resolved'"
    );
    const [[citizens]] = await pool.query(
      "SELECT COUNT(*) total FROM users WHERE role='citizen'"
    );
    const [[staff]] = await pool.query(
      "SELECT COUNT(*) total FROM users WHERE role='staff'"
    );

    res.json({
      totalComplaints: total.total,
      pending: pending.total,
      resolved: resolved.total,
      totalCitizens: citizens.total,
      totalStaff: staff.total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View all complaints
exports.allComplaints = async (req, res) => {
  try {
    const { status, category } = req.query;

    let sql =
      "SELECT id,title,status,category,created_at,assigned_staff_id FROM complaints WHERE 1=1";
    const params = [];

    if (status) {
      sql += " AND status=?";
      params.push(status);
    }
    if (category) {
      sql += " AND category=?";
      params.push(category);
    }

    sql += " ORDER BY id DESC";

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign complaint to staff
exports.assignComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { staff_id } = req.body;

    if (!staff_id) {
      return res.status(400).json({ message: "staff_id required" });
    }

    const [staff] = await pool.query(
      "SELECT id FROM users WHERE id=? AND role='staff'",
      [staff_id]
    );
    if (!staff.length) {
      return res.status(400).json({ message: "Invalid staff id" });
    }

    const [complaints] = await pool.query(
      "SELECT id FROM complaints WHERE id=?",
      [id]
    );
    if (!complaints.length) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    await pool.query(
      "UPDATE complaints SET assigned_staff_id=?, status='assigned' WHERE id=?",
      [staff_id, id]
    );

    res.json({ message: "Complaint assigned to staff" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List users
exports.listUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id,name,email,role,created_at FROM users ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
