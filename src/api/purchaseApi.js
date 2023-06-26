import apiClient from "./client";
import authStorage from "../auth/storage";

const purchaseProduct = async (
    product,
    quantity,
    date,
) =>
  apiClient.post("/purchased", { productId: product, quantity, date }, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const getAllProductsPurchased = async () => apiClient.get('/purchased', {}, { headers: { authorization: `Bearer ${authStorage.getToken()}` }});

const productsApi = {
    purchaseProduct,
    getAllProductsPurchased,
};

export default productsApi;