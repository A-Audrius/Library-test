import { useContext } from "react";
import BookRow from "./BookRow";
import InvoiceContext from  "../../contexts/InvoiceContext";

const BookTable = () => {
  const { books } = useContext(InvoiceContext);

  return (
    <div className=" w-3/4 mx-auto gap-4 mt-6 items-center justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "> 
      {books.list && books.list.length > 0 ? (
        books.list.map((book, index) => (
          <BookRow
            key={book.id}
            book={book}
            className="w-full max-w-lg h-[80px] flex-grow-0 flex items-center justify-between  border-gray-600"
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No books found for the selected status.
        </p>
      )}
    </div>
  );
};

export default BookTable;





// import { useEffect, useState } from 'react';
// import Book from "./Book.jsx";
// // import SearchBar from '../SearchBar.jsx';
// import { getAll } from "../helpers/get.js";
// import { Link } from "react-router";
// // import ThemeContext from '../contexts/ThemeContext.jsx';


// function BooksList() {
//     // const { theme, setTheme } = useContext(ThemeContext);
//     // console.log(contextData);

//     const [items, setItems] = useState([]);
//     const [error, setError] = useState("");


//     // const handleInputChange = (e) => {
//     //     const searchTerm = e.target.value;
//     //     setItems(items);

//     //     if (searchTerm) {
//     //       const filteredItems = items.filter((item) => {
//     //         return item.status.toLowerCase().includes(searchTerm.toLowerCase());
//     //       });
//     //       setItems(filteredItems);
//     //     }


//     //   };

//     const getAllItems = async () => {
//         try {
//             const { allBooks } = await getAll();

//             setItems(allBooks);
//             setError("");
//         } catch (error) {
//             setError(error.message);
//         }
//     }

//     useEffect(() => {
//         getAllItems();
//     }, []);
//     return (
//         <>





//             <div className='flex my-5 items-center justify-center relative mx-20 '>

//                 {/* <p> User theme {theme}</p>
//                 <FaMoon />
//                 <MdSunny /> */}

//                 <form className="w-1/3 mx-5  ">
//                     <label htmlFor="default-search "
//                         className="mb-2 text-sm font-medium  text-gray-900 sr-only dark:text-white ">Search</label>
//                     <div className="relative ">
//                         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                             </svg>
//                         </div>
//                         <input type="search" id="default-search" className=" bg-gray-200 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
//                         <button type="submit"
//                             className="text-dark dark:text-white absolute end-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
//                     </div>
//                 </form>



//                 <div className=" h-10 flex items-center bg-blue-400 dark:bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4   p-4 text-gray-900      dark:text-white">
//                     <div className=' '>
//                         <Link to="/addbook"
//                             className=" " >
//                             Add New Book
//                         </Link>
//                     </div>
//                 </div>

//             </div>



//             <section className="flex mx-auto w-3/4 justify-center dark:bg-gray-800 ">
//                 <Book items={items} setItems={setItems} />
//                 {error && <p className="text-error">{error}</p>}
//             </section>

//             {/* <select className="bg-transparent text-slate-50 mb-5 mr-5 border-none" id="status" 
//                     name="status" {...register("status" )} 
//                     > */}
//             {/* <option className='bg-slate-950 text-transparent' value="">filter by status</option>
//                         <option className='bg-slate-950' value="pending">pending</option>
//                         <option className='bg-slate-950' value="paid">paid</option>
//                         <option className='bg-slate-950' color='bg-gray-500' value="draft">draft</option>
//                         onChange={handleInputChange} */}
//             {/* </select> */}
//             {/*                */}


//             {/* <section className="">
//         {items.map((item, index ) => {
//           return (
//             <Invoices items={items} setItems={setItems} key={index}/>
//           );
//         })}
//       </section> */}


//         </>




//     );
// }

// export default BooksList;