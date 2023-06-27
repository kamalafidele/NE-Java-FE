import apiClient from "./client";
import authStorage from "../auth/storage";

const addEmployee = async (
  firstname,
  lastname,
  national_identity,
  telephone,
  email,
  department_id,
  position,
  laptop_id,
) =>
  apiClient.post("/employees", { firstname, lastname, national_identity, telephone, email, position, department_id, laptop_id }, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const getEmployee = async (id) => apiClient.get(`/employees/${id}`, {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const getAllEmployees = async () => apiClient.get('/employees', {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const employessApi = {
    addEmployee,
    getEmployee,
    getAllEmployees,
};

export default employessApi;