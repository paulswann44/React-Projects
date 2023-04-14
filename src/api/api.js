import axios from 'axios';

const API = "http://localhost:3000/tasks/";

export const getAllTasks = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API, task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axios.patch(`${API}${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API}/${id}`);
};
