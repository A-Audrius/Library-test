import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import Profile from "../assets/profile.jpg";
import UserContext from "../contexts/UserContext";
import ThemeButton from "./ThemeButton";
import logo from "../assets/Library.png";


const API_URL = import.meta.env.VITE_API_URL;


function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  // Nustatome pradinę prisijungimo būseną (false - neprisijungęs)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Vartotojo vardas, kuris bus rodomas po prisijungimo
  const [username, setUsername] = useState('');


  const handleLogin = async () => {
    setUsername('vardas');
    setIsLoggedIn(true);
    navigate("/login");
  };

  // Funkcija, kuri bus iškviečiama paspaudus atsijungimo mygtuką
  // const handleLogout = () => {
  //   setUsername('');
  //   setIsLoggedIn(false);
  // };

  const logout = async () => {
    setUsername('');
    setIsLoggedIn(false);

    try {
      await axios.get(`${API_URL}/users/logout`, { withCredentials: true });

      setUser(null);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message ||
            "An error occurred, please try again."
          );
        } else if (error.request) {
          setError("No response from server. Check internet connection.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };



  return (
    <>
      <section className="w-3/4 mx-auto mb-10 h-16  bg-indigo-200 dark:bg-blue-950 dark:text-white flex  rounded-br-2xl rounded-bl-2xl justify-between">

        <img src={logo} alt="Library" className="w-16 mx-4 my-2" />

        <div className="flex ml-5 ">
          <ThemeButton />
        </div>


        <nav className="flex justify-center mx-auto text-center  mt-3">

          <Link to="/" className="btn btn-ghost bg-transparent">
            Home
          </Link>

          <Link to="/books" className="btn btn-ghost bg-transparent">
            Books
          </Link>
          <Link to="/invoices" className="btn btn-ghost">
            Invoices
          </Link>

          <Link to="/users" className="btn btn-ghost">
            {user?.role === "admin" && "Users"}
          </Link>

          {/* <h1 className="text-2xl font-bold text-center md:mx-80 ">Library</h1> */}
        </nav>


        {/* Sąlyginis atvaizdavimas, priklausomai nuo prisijungimo būsenos */}
        {isLoggedIn ? (
          <button
            onClick={handleLogin}
            className="bg-blue-300 hover:bg-blue-500 h-10 my-auto text-white px-4  rounded-md transition-colors"
          >
            Prisijungti
          </button>
        ) : (
          <div className="flex items-center space-x-4 mr-5">

            <span className="text-gray-700">Sveiki, {username}</span>
            <img
              src={Profile}
              alt="Profile"
              className="rounded-full w-10 h-10 mr-10  my-2 border"
            />

            <button
              onClick={logout}
              className="bg-red-300 hover:bg-red-500 text-white px-4 py-2 rounded-md transition-colors"
            >   {user && (
              <div className="relative" onBlur={() => setIsDropdownOpen(false)}>
                <div
                  className=" cursor-pointer mt-3"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src={Profile}
                    alt="Profile"
                    className="rounded-full w-10 h-10 mr-10  my-2 border"
                  />
                </div>
    
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full lg:left-12 lg:top-0 mt-2 w-32 bg-white shadow-lg rounded-lg overflow-hidden">
                    <button
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
    
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              Atsijungti
            </button>
          </div>
        )}



        {/* {user && (
          <div className="relative" onBlur={() => setIsDropdownOpen(false)}>
            <div
              className=" cursor-pointer mt-3"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={Profile}
                alt="Profile"
                className="rounded-full w-10 h-10 mr-10  my-2 border"
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full lg:left-12 lg:top-0 mt-2 w-32 bg-white shadow-lg rounded-lg overflow-hidden">
                <button
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}

      </section>

    </>

  );
}

export default Header;




