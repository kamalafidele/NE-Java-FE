import apiClient from "./client";
import authStorage from "../auth/storage";



const getAllDepartments = async () => apiClient.get('/departments', {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const departmentsApi = {
     getAllDepartments,
};

export default departmentsApi;