
const key = 'authToken';
const userKey = "user";

const getToken = () => localStorage.getItem(key);
const storeToken = token => localStorage.setItem(key, token);
const removeToken = () => localStorage.removeItem(key);

const getUser = () => localStorage.getItem(userKey);
const storeUser = userStr => localStorage.setItem(userKey, userStr);
const removeUser = () => localStorage.removeItem(userKey);

const authStorage = {
    getToken,
    storeToken,
    removeToken,
    getUser,
    storeUser,
    removeUser,
};

export default authStorage;
