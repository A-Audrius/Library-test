import UserRow from "./UserRow.jsx";


function User(props) {
  const { items, setItems } = props;

  const itemElements = items.map(item => 
  <UserRow key={item.id} item={item} setItems={setItems} />);

  return (
    <>
 
    <div className=" gap-4 ">  
        {itemElements}
    </div>
    
    </>
  
  );
}

export default User;