import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'http://localhost:8080/api',
    timeout: 1000000,
});

export default apiClient;