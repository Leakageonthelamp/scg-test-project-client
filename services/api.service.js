import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:3000/api'
    : 'http://localhost:3000/api';

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'X-Requested-With': 'XMLHttpRequest',
};

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common = HEADERS;

//Admin API
export const signUpAdmin = async (data) => {
  return await axios.post('admin/signup', data);
};

export const loginAdmin = async (data) => {
  return await axios.post('admin/login', data);
};

//Machines API
export const getAllMachines = async () => {
  return await axios.get('machines');
};

export const addNewMachines = async (payload) => {
  return await axios.post('machines', payload);
};

export const getMachineById = async (machineId) => {
  return await axios.get(`machines/${machineId}`);
};

export const editMachine = async (machineId, payload) => {
  return await axios.put(`machines/${machineId}`, payload);
};

export const deleteMachine = async (machineId) => {
  return await axios.delete(`machines/${machineId}`);
};

//Machine Item API
export const getMachineItems = async (machineId) => {
  return await axios.get(`machines/${machineId}/getItems`);
};

export const addNewItem = async (machineId, itemId, payload) => {
  return await axios.post(`machines/${machineId}/addItem/${itemId}`, payload);
};

export const buyItem = async (machineId, itemId) => {
  return await axios.patch(`machines/${machineId}/buyItem/${itemId}`);
};

export const addItemQty = async (machineId, itemId, payload) => {
  return await axios.patch(
    `machines/${machineId}/addItemQty/${itemId}`,
    payload
  );
};

export const deleteMachineItem = async (machineId, itemId) => {
  return await axios.delete(`machines/${machineId}/deleteItem/${itemId}`);
};

//Notify API
export const getAllNotify = async () => {
  return await axios.get('notify');
};

export const deleteNotify = async (notifyId) => {
  return await axios.delete(`notify/${notifyId}`);
};

//Product API
export const getAllProducts = async () => {
  return await axios.get('products');
};

export const addNewProduct = async (payload) => {
  return await axios.post('products', payload);
};

export const editProduct = async (productId, payload) => {
  return await axios.put(`products/${productId}`, payload);
};

export const deleteProduct = async (productId) => {
  return await axios.delete(`products/${productId}`);
};
