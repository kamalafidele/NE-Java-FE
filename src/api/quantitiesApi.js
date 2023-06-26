import apiClient from "./client";
import authStorage from "../auth/storage";

const addQuantity = async (
    operation,
    quantity,
    product,
    date,
) =>
  apiClient.post("/quantities", { operation, quantity, productId: product, date }, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const getQuantity = async (id) => apiClient.get(`/quantities/${id}`, {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const getAllQuantities = async () => apiClient.get('/quantities', {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const productsApi = {
    addQuantity,
    getQuantity,
    getAllQuantities,
};

export default productsApi;