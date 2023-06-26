import apiClient from "./client";

const login = async (username, password) => apiClient.post('/auth/signin', { username, password });

const signup = async (username, email, password) => apiClient.post('/auth/signup', { username, email, password });

const authApi = { login, signup }

export default authApi;
