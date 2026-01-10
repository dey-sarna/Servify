const router = require("express").Router();
const auth = require("../../middleware/auth");
const role = require("../../middleware/role");
const c = require("./admin.controller");

// Dashboard overview
router.get("/overview", auth, role("admin"), c.overview);

// All complaints 
router.get("/complaints", auth, role("admin"), c.allComplaints);

// Assign complaint to staff
router.patch("/complaints/:id/assign", auth, role("admin"), c.assignComplaint);

// Manage users
router.get("/users", auth, role("admin"), c.listUsers);

module.exports = router;
