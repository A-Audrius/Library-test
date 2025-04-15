const { body } = require("express-validator");

const statuses = ["Draft", "Pending", "Paid"];
const regEx = /^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const validateNewBook = [
  body("due_date")
    .notEmpty()
    .withMessage("Due date is required")
    .matches(regEx)
    .withMessage("Due date must be a valid date"),

  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isFloat({ min: 1, max: 100 })
    .withMessage("Author name must be between 1 and 100 characters"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(statuses)
    .withMessage(`Status must be one of ${statuses.join(", ")}`),
];

module.exports = validateNewBook;