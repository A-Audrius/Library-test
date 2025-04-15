const { 
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    filterBooks
    } = require("../models/booksModels");
    

  
  // exports.getAllBooks = async (req, res, next) => {
  //   try {
  //     const books = await getAllBooks();
  
  //     res.status(200).json({
  //       status: "success",
  //       allBooks: books,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  exports.getAllBooks = async (req, res, next) => {
    try {
      let { page, limit } = req.query;
  
      page = parseInt(page);
      limit = parseInt(limit);
  
      const offset = (page - 1) * limit;
  
      const books = await getBooks(limit, offset);
      res.status(200).json({
        status: "success",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  };
  

  exports.getOneBook = async (req, res, next) => {
    const { id } = req.params;
    try {
      const book = await getBook(id);
      res.status(200).json({
        status: "success",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.createBook = async (req, res) => {

    console.log(req.body);
    try {
      const newBook = req.body;
      console.log(newBook);
      
  
      if (!newBook || !newBook.author || !newBook.title || !newBook.date  || !newBook.status )  {
        res.status(400).json({
          status: 'fail',
          message:
            'Missing book information, or its required fields: author, title, description, isbn, date, status, or price',
        });
        return;
      }
  
      const createdBook = await createBook(newBook);
  
      res.status(201).json({
        status: 'success',
        data: createdBook,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
exports.updateThisBook = async (req, res, next) => {
  const id = req.params.id;
  const updatedBook = req.body;

  try {
    const book = await updateBook(id, updatedBook);
    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};


exports.deleteThisBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteBook(id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

  exports.filterBooksByStatus = async (req, res, next) => {
    try {
      let { status, page, limit } = req.query;
  
      let filter = null;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 6;
  
      if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
        return res.status(400).json({
          status: "error",
          message: "Invalid page or limit values",
        });
      }
  
      const offset = (page - 1) * limit;
  
      if (!filter && status) {
        filter = { status: status.trim().toUpperCase() };
      } else if (typeof filter === "string") {
        try {
          filter = JSON.parse(filter);
        } catch (error) {
          return res.status(400).json({
            status: "error",
            message: "Invalid filter format",
          });
        }
      }
  
      const filteredBooks = await filterBooks(filter, limit, offset);
  
      console.log("Filtered books:", filteredBooks);
  
      res.status(200).json({
        status: "success",
        data: filteredBooks,
      });
    } catch (error) {
      next(error);
    }
  };
