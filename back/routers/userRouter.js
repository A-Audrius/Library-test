const express = require("express");
const validateNewUser = require("../validators/signup");
const validate = require("../validators/validate");
const validateLogin = require("../validators/login");
const validateFilter = require("../validators/filter");
const validatePagination = require("../validators/pagination");
// const { protect, allowAccessTo } = require("../controllers/authController");
const {
  signup,
  login,
  logout,
  protect,
  getAuthenticatedUser,
  getUser,
  getAllUsers,
  deleteThisUser,
  // filterUsersByRole,
  filterUsersByStatus
} = require("../controllers/authController");



const router = express.Router();

router.route('/')
  .get( validatePagination, validate, getAllUsers);
router.route("/signup").post(validateNewUser, validate, signup);
router.route("/login").post(validateLogin, validate, login);
router.route("/logout").get(protect, logout);
router.route("/me").get(protect, getAuthenticatedUser);
router.route("/:id")
  .get(validate, getUser)
  .delete(deleteThisUser);
// router
//   .route("/filter")
//   .get(validateFilter, validate, filterUsersByRole);

router
  .route("/filter")
  .get(validateFilter, validate, filterUsersByStatus);

module.exports = router;








