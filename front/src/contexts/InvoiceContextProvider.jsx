// import { useState } from "react";
// import InvoiceContext from "./InvoiceContext";

// function InvoiceContextProvider({ children }) {
//   const [invoices, setInvoices] = useState({ list: [], total: 0 });
//   const [books, setBooks] = useState({ list: [], total: 0 });
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [invoicesPerPage] = useState(5);
//   const [booksPerPage] = useState(5);


//   return (
//     <InvoiceContext.Provider value={{books, setBooks, invoices, setInvoices, error, setError, currentPage, setCurrentPage, booksPerPage, invoicesPerPage}}>
//       {children}
//     </InvoiceContext.Provider>
//   );
// }

// export default InvoiceContextProvider;

import { useState } from "react";
import InvoiceContext from "./InvoiceContext";
import PropTypes from 'prop-types';

function InvoiceContextProvider({ children }) {
  const [invoices, setInvoices] = useState({ list: [], total: 0 });
  const [books, setBooks] = useState({ list: [], total: 0 });
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(5);
  const [booksPerPage] = useState(6);

  return (
    <InvoiceContext.Provider value={{books, setBooks, invoices, setInvoices, error, setError, currentPage, setCurrentPage, booksPerPage, invoicesPerPage}}>
      {children}
    </InvoiceContext.Provider>
  );
}

InvoiceContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InvoiceContextProvider;
