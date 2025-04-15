const { param } = require("express-validator");
const { getBook } = require("../models/booksModels");

const validateBookId = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("ID must be a positive integer")
    .bail()
    .custom(async (id) => {
      const book = await getBook(id);
      if (!book) throw new Error("Book not found");
      return true;
    }),
];

module.exports = validateBookId;