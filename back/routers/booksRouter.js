const express = require('express');
const validate = require("../validators/validate");
const validateBookId = require("../validators/bookId");
const validateNewBook = require("../validators/newBook");
const validateFilter = require("../validators/filter");
const validatePagination = require("../validators/pagination");
const { protect, allowAccessTo } = require("../controllers/authController");

const {
    getAllBooks,
    getOneBook,
    // createNewBook,
    createBook,
    updateThisBook,
    deleteThisBook,
    filterBooksByStatus
} = require('../controllers/booksController');

const router = express.Router()


// router.route('/').get(getAllBooks);
// // router.route('/').post(createBook);
// router.route("/:id")
//     // .get(getOneInvoice)
//     // .patch(updateInvoice)
//     // .delete(deleteInvoice);

// router.route("/filter").get( filterBooksByStatus);

router
  .route("/")
  .post(
    protect,
    allowAccessTo("admin"),
    validateNewBook,
    validate,
    createBook
  )
  .get(validatePagination, validate, getAllBooks);

router
  .route("/filter")
  .get(validateFilter, validate, filterBooksByStatus);

router
  .route("/:id")
  .get(validateBookId, validate, getOneBook)
  .patch(
    protect,
    allowAccessTo("admin"),
    validateNewBook,
    validateBookId,
    validate,
    updateThisBook
  )
  .delete(
    protect,
    allowAccessTo("admin"),
    validateBookId,
    validate,
    deleteThisBook
  );

module.exports = router;


