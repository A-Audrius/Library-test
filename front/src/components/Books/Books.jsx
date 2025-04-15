import { useContext, useState, useEffect } from "react";
import { filterBooks } from "../../helpers/filter";
import { getAllBooks } from "../../helpers/get";
import BookTable from "./BookTable";
import InvoiceContext from "../../contexts/InvoiceContext";
import UserContext from "../../contexts/UserContext";
import CreateNewBook from "./CreateNewBook";
import Header from "../Header";

const Books = () => {
  const {
    books,
    setBooks,
    error,
    setError,
    currentPage,
    setCurrentPage,
    booksPerPage,
  } = useContext(InvoiceContext);

  const { user } = useContext(UserContext);
  const [selectedStatus, setSelectedStatus] = useState("Filter by status");

  const fetchBooks = async (status, page, limit) => {
    setError(null);
    setBooks({ list: [], total: 0 });

    try {
      let response;

      if (status && status !== "Filter by status") {
        response = await filterBooks({ status }, page, limit);
      } else {
        response = await getAllBooks(page, limit);
        console.log(response);
      }

      const booksArray = response.data?.books || [];
      console.log(booksArray);

      const totalCount = Number(response.data?.total_count) || 0;

      setBooks({ list: booksArray, total: totalCount });

    } catch (error) {
      setError("Failed to load books. Please try again.");
    }
  };

  useEffect(() => {
    fetchBooks(selectedStatus, currentPage, booksPerPage);
  }, [selectedStatus, currentPage, booksPerPage]);

  const handleStatusChange = (event) => {
    const status = event.target.value;

    setSelectedStatus(status);
    setCurrentPage(1);
    setBooks({ list: [], total: 0 });
  };

  const totalPages = Math.ceil(books.total / booksPerPage);

  return (
    <>
      <div className="dark:bg-[#141625] ">
        <div className=" ">
          <Header />

          <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-10 pt-24 lg:pt-6 w-full ">
          <div className="w-full flex flex-col md:flex-row justify-center gap-12 items-center">
      
            <div className="text-left">
                <h1 className="dark:text-white text-2xl md:text-3xl font-bold">
                  Books
                </h1>
                <h2 className="text-gray-400 text-sm md:text-base">
                  {books.total > 0
                    ? `There are ${books.total} total invoices`
                    : "No books available"}
                </h2>
              </div>

              <div className="flex gap-4 mx-2">
                <select
                  name="status"
                  id="status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="border border-gray-300 rounded-md p-2 dark:text-white mb-5"
                >
                  <option value="Filter by status" className="text-black">
                    Filter by status
                  </option>
                  <option value="Draft" className="text-black">
                    Draft
                  </option>
                  <option value="Pending" className="text-black">
                    Pending
                  </option>
                  <option value="Paid" className="text-black">
                    Paid
                  </option>
                </select>

                {user?.role === "admin" && <CreateNewBook />}
              </div>
            </div>

            {error && <p className="text-red-500  text-center mt-4">{error}</p>}
          </div>
        </div>

        <div className="">
          <BookTable />

          <div className="flex justify-center items-center py-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className=" px-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage >= totalPages}
              className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;





