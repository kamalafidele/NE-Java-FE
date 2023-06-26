import apiClient from "./client";
import authStorage from "../auth/storage";

const addProduct = async (
    code,
    name,
    type,
    price,
    inDate,
    image,
) =>
  apiClient.post("/products", { code, name, type, price, inDate, image }, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const getProduct = async (id) => apiClient.get(`/products/${id}`, {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const getAllProducts = async () => apiClient.get('/products', {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const productsApi = {
    addProduct,
    getProduct,
    getAllProducts,
};

export default productsApi;