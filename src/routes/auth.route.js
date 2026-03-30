const router = require("express").Router();
const authController = require("../controllers/auth.controller");


// router.post("/register", (req, res) => {
//   return res.send("DIRECT HIT");
// });

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);

module.exports = router;