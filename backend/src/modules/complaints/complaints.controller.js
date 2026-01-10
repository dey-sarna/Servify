const pool = require("../../config/db");

// Create new complaint (Citizen)
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category, location_text } = req.body;

    if (!title || !description || !category || !location_text) {
      return res.status(400).json({ message: "All fields required" });
    }

    const [result] = await pool.query(
      "INSERT INTO complaints(citizen_id,title,description,category,location_text) VALUES(?,?,?,?,?)",
      [req.user.id, title, description, category, location_text]
    );

    res.status(201).json({
      message: "Complaint submitted",
      complaintId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View own complaints (Citizen)
exports.myComplaints = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id,title,status,created_at FROM complaints WHERE citizen_id=? ORDER BY id DESC",
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Citizen: dashboard summary
exports.citizenSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const [[total]] = await pool.query(
      "SELECT COUNT(*) total FROM complaints WHERE citizen_id=?",
      [userId]
    );
    const [[pending]] = await pool.query(
      "SELECT COUNT(*) total FROM complaints WHERE citizen_id=? AND status='pending'",
      [userId]
    );
    const [[inProgress]] = await pool.query(
      "SELECT COUNT(*) total FROM complaints WHERE citizen_id=? AND status='in_progress'",
      [userId]
    );
    const [[resolved]] = await pool.query(
      "SELECT COUNT(*) total FROM complaints WHERE citizen_id=? AND status='resolved'",
      [userId]
    );

    res.json({
      total: total.total,
      pending: pending.total,
      inProgress: inProgress.total,
      resolved: resolved.total,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// View complaint details (All roles but restricted)
exports.getComplaintDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const [rows] = await pool.query(
      `SELECT c.*, u.name AS citizen_name
       FROM complaints c
       JOIN users u ON u.id = c.citizen_id
       WHERE c.id=?`,
      [id]
    );

    if (!rows.length) return res.status(404).json({ message: "Not found" });

    const complaint = rows[0];

    // Citizen can see only own complaint
    if (req.user.role === "citizen" && complaint.citizen_id !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const [updates] = await pool.query(
      "SELECT * FROM complaint_updates WHERE complaint_id=? ORDER BY id DESC",
      [id]
    );

    res.json({ complaint, updates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Staff: view assigned complaints
exports.assignedComplaints = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id,title,status,created_at FROM complaints WHERE assigned_staff_id=? ORDER BY id DESC",
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Staff: update complaint status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_status, note } = req.body;

    const allowed = ["in_progress", "resolved"];
    if (!allowed.includes(new_status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const [rows] = await pool.query(
      "SELECT status, assigned_staff_id FROM complaints WHERE id=?",
      [id]
    );

    if (!rows.length) return res.status(404).json({ message: "Complaint not found" });

    const complaint = rows[0];

    // ensure this staff is assigned
    if (complaint.assigned_staff_id !== req.user.id) {
      return res.status(403).json({ message: "Not assigned to you" });
    }

    await pool.query(
      "UPDATE complaints SET status=? WHERE id=?",
      [new_status, id]
    );

    await pool.query(
      `INSERT INTO complaint_updates
       (complaint_id, updated_by, old_status, new_status, note)
       VALUES (?,?,?,?,?)`,
      [id, req.user.id, complaint.status, new_status, note || null]
    );

    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
