const router = require("express").Router();
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");
const c = require("./complaints.controller");

// Citizen: create complaint
router.get("/citizen/summary", auth, role("citizen"), c.citizenSummary);

router.post("/", auth, role("citizen"), c.createComplaint);

// Citizen: view my complaints
router.get("/mine", auth, role("citizen"), c.myComplaints);

// Citizen / Staff / Admin: view complaint details
router.get("/:id", auth, c.getComplaintDetails);

// Staff: assigned complaints
router.get("/", auth, role("staff"), c.assignedComplaints);

// Staff: update complaint status
router.patch("/:id/status", auth, role("staff"), c.updateStatus);

module.exports = router;
