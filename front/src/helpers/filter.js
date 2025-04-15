import axios from "axios";

const url = "http://localhost:3002/api/v1/invoices/filter";

export const filterInvoices = async (filters = {}, page = 1, limit = 5) => {
  try {
    const queryString = new URLSearchParams(filters, page, limit).toString();


    const requestUrl = `${url}?page=${page}&limit=${limit}${queryString ? `&${queryString}` : ""}`;
    console.log(queryString)
    console.log(requestUrl);
    const response = await axios.get(requestUrl, { withCredentials: true });
    // console.log(response);
    
    

    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};


const urlBooks = "http://localhost:3002/api/v1/books/filter";

export const filterBooks = async (filters = {}, page = 1, limit = 5) => {
  try {
    const queryString = new URLSearchParams(filters, page, limit).toString();


    const requestUrl = `${urlBooks}?page=${page}&limit=${limit}${queryString ? `&${queryString}` : ""}`;
    console.log(queryString)
    console.log(requestUrl);
    const response = await axios.get(requestUrl, { withCredentials: true });

    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};


const urlUsers = "http://localhost:3002/api/v1/users/filter";

export const filterUsers = async (filters = {}, page = 1, limit = 5) => {
  try {
    const queryString = new URLSearchParams(filters, page, limit).toString();


    const requestUrl = `${urlUsers}?page=${page}&limit=${limit}${queryString ? `&${queryString}` : ""}`;
    console.log(queryString)
    console.log(requestUrl);
    const response = await axios.get(requestUrl, { withCredentials: true });
    // console.log(response);
    
    

    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};
