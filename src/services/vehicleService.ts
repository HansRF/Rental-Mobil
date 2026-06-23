import axios from "axios";

const API =
  "http://127.0.0.1:8000/api/vehicles";

export const getVehicles = () =>
  axios.get(API);

export const createVehicle = (
  data: any
) => axios.post(API, data);

export const updateVehicle = (
  id: string,
  data: any
) => axios.put(`${API}/${id}`, data);

export const deleteVehicle = (
  id: string
) => axios.delete(`${API}/${id}`);