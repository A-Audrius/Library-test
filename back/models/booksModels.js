const { sql } = require("../dbConnection");


// exports.getAllBooks = async () => {
//   const books = await sql`
//     SELECT *
//     FROM books
//     `;

//   return books;
// };

exports.getBooks = async (limit, offset) => {
  const books = await sql`SELECT books.*
    FROM books
    ORDER BY books.id
    ${
      !isNaN(limit) && !isNaN(offset)
        ? sql`LIMIT ${limit} OFFSET ${offset}`
        : sql``
    } `;
  const totalBooks =
    await sql`SELECT COUNT(books.id) AS total FROM books`;
  const total_count = totalBooks[0].total;

  return { books, total_count };
};


exports.getBook = async (id) => {
  const [book] = await sql`
    SELECT books.*
    FROM books
    WHERE books.id = ${id}
    `;
  return book;
};

exports.createBook = async (newBook) => {
  const { author, title, date, status } = newBook;
  const books = await sql`
        INSERT INTO books (author, title, date, status)

          VALUES (${author}, ${title}, ${date}, ${status})
        RETURNING *;
    `;

    return books[0];
};


// exports.updateBook = async (id, book) => {
//   const columns = Object.keys(book);

//   const newBook = await sql`
//   update invoices set ${sql(book, columns)}
//   where invoices.id = ${id}
//   RETURNING *`;

//   return newBook[0];
// };
exports.updateBook = async (id, updatedBook) => {
  const [book] = await sql`
    UPDATE books
    SET ${sql(updatedBook, "due_date", "title", "author", "status")}
    WHERE books.id = ${id}
    RETURNING *;
    `;
  return book;
};

exports.deleteBook = async (id) => {
  const book = await sql`
  DELETE FROM books
  WHERE id = ${id}
  RETURNING *;
  `;
  return book[0];
};

exports.filterBooks = async (filter, limit, offset) => {
  const validStatuses = ["DRAFT", "PENDING", "PAID"];
  console.log(filter);
  const statusFilter = validStatuses.includes(filter.status.toUpperCase())
    ? filter.status.toUpperCase()
    : null;

  const books = await sql`
    SELECT books.*
    FROM books
    WHERE UPPER(books.status) = ${statusFilter}
    ORDER BY books.book_id
    ${
      !isNaN(limit) && !isNaN(offset)
        ? sql`LIMIT ${limit} OFFSET ${offset}`
        : sql``
    } `;
  const totalBooks =
    await sql`SELECT COUNT(books.id) AS total FROM books
    WHERE UPPER(books.status) = ${statusFilter}`;
  const total_count = totalBooks[0].total;

  return { books, total_count };
};