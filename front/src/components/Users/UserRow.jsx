import { deleteOneUser } from "../../helpers/delete.js";


function UserRow(props) {
    const { item, setItems } = props;
    const { id, email, username, role } = item;



    const handleDelete = async () => {
        if (!confirm("Are you sure?")) return;

        try {
            await deleteOneUser(id);
            setItems(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <>
            

            <div className=" mb-5  ">
                <div className=" h-20 w-80 flex relative text-gray-900 border rounded-lg bg-indigo-200   dark:bg-indigo-950 dark:border-gray-600  dark:text-white ">

                    <div className="h-10  text-start mt-1 text-xs ">

                        <div className="px-6  ">
                            <span className="font-bold">ID: </span>
                            {id}
                        </div>

                        <div className="px-6  ">
                            <span className="font-bold">Email: </span>
                            {email}
                        </div>

                        <div className="px-6  ">
                            <span className="font-bold">Username: </span>
                            {username}
                        </div>

                        <div className="px-6  ">
                            <span className="font-bold">Role: </span>
                            {role}
                        </div>
                    </div>

                    <div className="w-7 h-7 border flex mt-2 absolute right-2 text-gray-950 dark:text-gray-200 rounded-box" onClick={handleDelete} >
                        <svg className="w-6 h-6 mx-auto mt-0.5 text-gray-800 dark:text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                    </div>
                </div>
            </div>

        </>
    );
}

export default UserRow;