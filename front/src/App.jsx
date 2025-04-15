import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Invoices from "./components/invoices/Invoices";
import NotFound from "./components/NotFound";
import EditInvoice from "./components/invoices/EditInvoice";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Books from "./components/Books/Books";
import UsersList from "./components/Users/UsersList";
// import EditBook from "./components/Books/EditBook";
import Homepage from "./components/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/invoices/edit/:id" element={<EditInvoice />} />
          {/* <Route path="/books/edit/:id" element={<EditBook />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
