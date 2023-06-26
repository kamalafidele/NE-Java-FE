import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductsPage from "./pages/ProductsPage";
import PurchasedPage from "./pages/PurchasedPage";
import TestPagination from "./pages/TestPagination";
import AccountPage from "./pages/AccountPage";
import QuantityPage from "./pages/QuantityPage";

function App() {
  return (
    <Routes>
      <Route element={<LoginPage/>} path="/"/>
      <Route element={<SignupPage/>} path="/signup" />
      <Route element={<TestPagination/>} path="/pagination" />
      <Route element={<ProtectedRoute><ProductsPage/></ProtectedRoute>} path="/products"/>
      <Route element={<ProtectedRoute><PurchasedPage/></ProtectedRoute>} path="/purchased"/>
      <Route element={<ProtectedRoute><QuantityPage/></ProtectedRoute>} path="/quantities"/>
      <Route element={<ProtectedRoute><AccountPage/></ProtectedRoute>} path="/account"/>
    </Routes>
  );
}

export default App;
