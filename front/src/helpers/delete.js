import axios from "axios";

const url = "http://localhost:3002/api/v1/invoices";

export const deleteOne = async (id) => {
  await axios.delete(`${url}/${id}`, { withCredentials: true });
};

const urlUsers = "http://localhost:3002/api/v1/users";

export const deleteOneUser = async (id) => {
  await axios.delete(`${urlUsers}/${id}`, { withCredentials: true });
};
