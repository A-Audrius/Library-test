import axios from "axios";

const url = "http://localhost:3002/api/v1/invoices";

export const getAll = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(`${url}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const urlBooks = "http://localhost:3002/api/v1/books";

export const getAllBooks = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(`${urlBooks}?page=${page}&limit=${limit}`);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOne = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
};


const urlUsers = "http://localhost:3002/api/v1/users";
export const getAllUsers = async () => {
  const response = await axios.get(urlUsers, { withCredentials: true });

  return response.data;
}

const urlOneUser = "http://localhost:3002/api/v1/users/me";

export const getOneUser = async () => {
  try {
    const response = await axios.get(`${urlOneUser}`, { withCredentials: true });
    return response.data;
  } catch (error) { 
    console.error( error);    
    throw error;    
  }



};