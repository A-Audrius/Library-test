import Header from "./Header";
import logo from "../assets/Library.png";
// import { Link } from "react";


function Homepage() {
    return ( 
        <>
        <Header />
        <div className="flex justify-center items-center h-screen flex-col gap-4">
            <h1 className="text-4xl font-bold dark:text-white">Welcome to the Library!</h1>
            <p className="text-2xl dark:text-white">Here you can find the best books and authors in the world!</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Get Started</button>
            <img src={logo} alt="Library" className="w-1/2 h-1/2" />
            {/* <Link to="/login" className="text-2xl dark:text-white">Login</Link> */}
        </div>

        </>
        
     );
}

export default Homepage;