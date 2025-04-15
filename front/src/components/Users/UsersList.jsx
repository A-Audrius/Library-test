import { useContext, useEffect, useState } from 'react';
import User from "./User.jsx";
import { filterUsers } from "../../helpers/filter";
// import SearchBar from '../SearchBar.jsx';
import { getAllUsers } from "../../helpers/get.js";
import Header from "../Header.jsx";
// import UserContext from '../../contexts/UserContext';
import InvoiceContext from '../../contexts/InvoiceContext.jsx';
// import { Link } from "react-router";


function UsersList() {
    const {
        users,
        setUsers,
        error,
        setError,
        currentPage,
        setCurrentPage,
        usersPerPage,
      } = useContext(InvoiceContext);
    
      // const { user } = useContext(UserContext);
      const [selectedStatus, setSelectedStatus] = useState("Filter by status");

    const [items, setItems] = useState([]);
    // const [error, setError] = useState("");


    // const handleInputChange = (e) => {
    //     const searchTerm = e.target.value;
    //     setItems(items);

    //     if (searchTerm) {
    //       const filteredItems = items.filter((item) => {
    //         return item.status.toLowerCase().includes(searchTerm.toLowerCase());
    //       });
    //       setItems(filteredItems);
    //     }


    //   };

    // const getAllItems = async () => {
    //     try {
    //         const { allUsers } = await getAllUsers();

    //         setItems(allUsers);
    //         setError("");
    //     } catch (error) {
    //         setError(error.message);
    //     }
    // }

    // useEffect(() => {
    //     getAllItems();
    // }, []);


  const fetchUsers = async (status, page, limit) => {
    setError(null);
    setUsers({ list: [], total: 0 });

    try {
      let response;

      if (status && status !== "Filter by status") {
        response = await filterUsers({ status }, page, limit);
      } else {
        response = await getAllUsers(page, limit);
      }


      const usersArray = response.data?.users || [];
      console.log(usersArray);
      
      const totalCount = Number(response.data?.total_count) || 0;

      setUsers({ list: usersArray, total: totalCount });
      console.log(usersArray);
      
    } catch (error) {
      setError("Failed to load users. Please try again.");
    }
  };

  useEffect(() => {
    fetchUsers(selectedStatus, currentPage, usersPerPage);
  }, [selectedStatus, currentPage, usersPerPage]);

  const handleStatusChange = (event) => {
    const status = event.target.value;

    setSelectedStatus(status);
    setCurrentPage(1);
    setUsers ({ list: [], total: 0 });
  };

  const totalPages = Math.ceil(users.total );

    return (
        <>

<div className="dark:bg-[#141625] ">
        <div className="  ">
          <Header />

          <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-10 pt-24 lg:pt-6 w-full ">
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 items-center">
              <div className="text-left">
                <h1 className="dark:text-white text-2xl md:text-3xl font-bold">
                  Invoices
                </h1>
                <h2 className="text-gray-400 text-sm md:text-base">
                  {users.total > 0
                    ? `There are ${users.total} total invoices`
                    : "No invoices available"}
                </h2>
              </div>

              <div className="md:flex gap-4 mx-2">
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
                  <option value="user" className="text-black">
                    user
                  </option>
                  <option value="admin" className="text-black">
                    admin
                  </option>
                </select>

                {/* {user?.role === "admin" && <CreateInvoice />} */}
              </div>
            </div>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </div>
        <div className="h-screen">

           <User items={items} setItems={setItems} />

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

            {/* <Header /> */}

            {/* <div className="text-left">
                <h1 className="dark:text-white text-2xl md:text-3xl font-bold">
                  Users
                </h1>
                <h2 className="text-gray-400 text-sm md:text-base">
                  {users.total > 0
                    ? `There are ${users.total} total users`
                    : "No users available"}
                </h2>
              </div> */}

            {/* <section className="flex mx-auto w-3/4 justify-center "> */}
            {/* {user?.role === "admin" && <User items={items} setItems={setItems}/>} */}
                {/* <User items={items} setItems={setItems} />
                {error && <p className="text-error">{error}</p>}
            </section> */}
        </>




    );
}

export default UsersList;