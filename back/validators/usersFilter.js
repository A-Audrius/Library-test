const { query } = require("express-validator");
const roles = ["user", "admin"];

const validateFilter = [
  query("role")
    .optional()
    .isString()
    .withMessage("Role must be a string")
    .isIn(roles)
    .withMessage("Role must be user or admin"),
];

module.exports = validateFilter;

