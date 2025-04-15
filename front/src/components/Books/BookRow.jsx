import { Link } from "react-router";
import { deleteOne } from "../../helpers/delete";
import { useContext } from "react";
import InvoiceContext from "../../contexts/InvoiceContext";
import UserContext from "../../contexts/UserContext";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const BookRow = ({ book }) => {
  const { setBooks } = useContext(InvoiceContext);
  const { user } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { id, title, author, due_date, status } = book;
  const date = new Date(due_date).toISOString().split("T")[0];

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (confirmed) {
      setBooks((prev) => ({
        ...prev,
        list: prev.list.filter((book) => book.id !== id),
      }));

      try {
        await deleteOne(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className=" bg-indigo-200 dark:bg-indigo-950 rounded-lg px-6 py-6 my-2 items-center justify-between ">
      {/* <p className="font-semibold  dark:text-gray-300">{isbn}</p> */}
      <p className="font-semibold  dark:text-gray-300">{id}</p>
      

      <p className="font-semibold dark:text-white ">pavadinimas: {title}</p>

      <p className="font-semibold text-lg dark:text-white">autorius: {author}</p>
      <p className="text-sm  text-gray-900 dark:text-white py-2">{date}</p>
      <div
        className={`px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-2 w-[100px]
        ${status === "Draft" ? "bg-gray-400 dark:bg-gray-700 text-gray-700 dark:text-gray-300" : ""} 
        ${status === "Pending" ? "bg-yellow-200 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-500" : ""} 
        ${status === "Paid" ? "bg-green-200 dark:bg-green-900 text-green-900 dark:text-green-400" : ""}`}
      >
        <GoDotFill />
        {status}
      </div>

      {user?.role === "admin" && (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            className="text-purple-800 hover:text-purple-500 mt-2"
          >
            <IoIosArrowForward />
          </button>

          {isDropdownOpen && (
            <div className="absolute mt-2 top-0 ml-4 w-32 bg-white text-black shadow-lg rounded-md">
              <Link
                to={`/invoices/edit/${id}`}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Edit
              </Link>

              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookRow;







// import { deleteOne } from "../helpers/delete.js";
// import { useState } from "react";
// // import { useNavigate } from "react-router";
// import { Link } from "react-router";
// // import EditInvoice from "./EditInvoice";
// // import Dropdown from "./Dropdown.jsx";

// function BooksRow(props) {
//     const { item, setItems } = props;
//     const { id, title, date, author, isbn, status } = item;

//     // const [isOpen, setIsOpen] = useState(false);

//     const handleDelete = async () => {
//         if (!confirm("Are you sure?")) return;

//         try {
//             await deleteOne(id);
//             setItems(prev => prev.filter(item => item.id !== id));
//         } catch (error) {
//             console.error(error);
//         }
//     }



//     return (
//         <>

//             <div className=" mb-5  ">
//                 <div className=" h-40 w-80 mx-auto  text-gray-900 border rounded-lg  dark:bg-gray-700 dark:border-gray-600  dark:text-white ">

//                     <div className="h-10  text-start mt-2 text-sm ">
//                         <div className="px-6 w-10 ">{id}</div>
//                         {/* <div className="flex text-start px-6 w-52  ">
//                             <span className="font-bold">Autorius: </span>
//                             {author}
//                         </div> */}
//                         <div className="px-6  ">
//                             <span className="font-bold">Autorius: </span>
//                             {author}
//                         </div>

//                         <div className="px-6  ">
//                             <span className="font-bold">Knygos pavadinimas: </span>
//                             {title}
//                         </div>

//                         <div className="px-6 w-44">{date}</div>

//                         {/* <div className="text-start px-6 w-full ">
//                             <span className="font-bold">Aprašymas:</span>
//                             {description}
//                         </div> */}
                       
//                         <div className="text-start px-6 w-44">
//                             <span className="font-bold">ISBN: </span>
//                             {isbn}
//                         </div>

//                         <div className="flex font-bold pl-6"> Status: 
//                             <span
//                                 className={`px-3 rounded-md text-sm  font-semibold flex mb-3 ml-2 items-center gap-2
//                             ${status === "free" ? "bg-green-300 pb-0.5 dark:bg-green-500 text-green-700 dark:text-green-900" : ""} 
//                             ${status === "reserved" ? "bg-yellow-500 pb-0.5 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-500" : ""} 
//                             ${status === "occupied" ? "bg-red-100 pb-0.5 dark:bg-red-200 text-red-900 dark:text-red-400" : ""}`} >
//                                 {status}
//                             </span>
//                         </div>
//                         <div className="relative">
//                             {/* <button
//                                 onClick={() => setIsOpen(!isOpen)}
//                                 onBlur={() => setTimeout(() => setIsOpen(false), 200)}
//                                 className="px-3">
                           
//                                 <svg className="w-6 h-6  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
//                                 </svg>
//                             </button> */}
//                             {/* {isOpen && (
//                                 <div className="absolute left-full top-0 ml-2 w-32 bg-white text-black shadow-lg rounded-md">
//                                     <Link
//                                         to={`/editInvoice/${id}`}
//                                         className="block px-4 py-2 hover:bg-gray-200"
//                                     >
//                                         Edit
//                                     </Link>
//                                     <button
//                                         onClick={handleDelete}
//                                         className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600"
//                                     >
//                                         delete invoice
//                                     </button>
//                                 </div>
//                             )} */}
//                         </div>

//                     </div>
//                 </div>
//             </div>



//         </>
//     );
// }

// export default BooksRow;







