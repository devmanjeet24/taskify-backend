const router = require("express").Router();
const taskController = require("../controllers/task.controller");
const { verifyAccessToken } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

// Create Task (Admin, Manager)
router.post(
  "/",
  verifyAccessToken,
  authorizeRoles("admin", "manager"),
  taskController.createTask
);

// Get Tasks (All roles)
router.get("/", verifyAccessToken, taskController.getTasks);

// Update Task Status (User/Admin)
router.put(
  "/:id",
  verifyAccessToken,
  taskController.updateTaskStatus
);

// Delete Task (Admin)
router.delete(
  "/:id",
  verifyAccessToken,
  authorizeRoles("admin"),
  taskController.deleteTask
);

module.exports = router;