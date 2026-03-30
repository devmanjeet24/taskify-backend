// const router = require("express").Router();
// const userController = require("../controllers/user.controller");
// const { verifyAccessToken } = require("../middleware/auth.middleware");
// const { authorizeRoles } = require("../middleware/role.middleware");

// // Admin only
// router.get(
//   "/",
//   verifyAccessToken,
//   authorizeRoles("admin"),
//   userController.getAllUsers
// );

// router.get(
//   "/:id",
//   verifyAccessToken,
//   authorizeRoles("admin"),
//   userController.getUser
// );

// router.put(
//   "/:id",
//   verifyAccessToken,
//   authorizeRoles("admin"),
//   userController.updateUser
// );

// router.delete(
//   "/:id",
//   verifyAccessToken,
//   authorizeRoles("admin"),
//   userController.deleteUser
// );

// module.exports = router;


const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { verifyAccessToken } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");

// ✅ Admin + Manager
router.get(
  "/",
  verifyAccessToken,
  authorizeRoles("admin", "manager"),
  userController.getUsers
);

// 👇 only admin
router.get(
  "/:id",
  verifyAccessToken,
  authorizeRoles("admin"),
  userController.getUser
);

router.put(
  "/:id",
  verifyAccessToken,
  authorizeRoles("admin"),
  userController.updateUser
);

router.delete(
  "/:id",
  verifyAccessToken,
  authorizeRoles("admin"),
  userController.deleteUser
);

module.exports = router;