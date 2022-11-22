import axios from "axios";

export const loadUsersApi = async () =>
  await axios.get("http://localhost:8080/api/tutorials/findAll");

export const createUserApi = async (user) =>
  await axios.post("http://localhost:8080/api/tutorials", user);

export const deleteUserApi = async (id) =>
  await axios.delete(`http://localhost:8080/api/tutorials/${id}`);

export const updateUserApi = async (id, userInfo) =>
  await axios.put(`http://localhost:8080/api/tutorials/${id}`,userInfo);
