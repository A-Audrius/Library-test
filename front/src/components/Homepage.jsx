import Header from "./Header";

function Homepage() {
    return ( 
        <>
        <Header />
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-4xl font-bold dark:text-white">Welcome to the Homepage</h1>
            
        </div>

        </>
        
     );
}

export default Homepage;