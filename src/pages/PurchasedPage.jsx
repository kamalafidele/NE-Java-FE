import React, { useEffect, useState } from "react";
import styled from "styled-components";


import authStorage from '../auth/storage';
import Sidebar from "../components/Sidebar";
import COLOR_PALETTE from "../constants/colors";
import DashboardTopNav from "../components/DashboardTopNav";
import purchasedApi from '../api/purchaseApi';

function PurchasedPage() {
  const [purchased, setPurchased] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const strUser = authStorage.getUser();
  const user = JSON.parse(strUser);
  
  const fetchPurchased = async () => {
    setLoading(true);
    const result = await purchasedApi.getAllProductsPurchased();

    console.log("purchased: ", result.data);
    if (result.ok) {
      setPurchased(result.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPurchased();
  }, []);


  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <DashboardTopNav user={user} title={'Purchased'}/>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              { purchased.map((purchase, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{ new Date(purchase.date).toDateString()}</td>
                  <td>{purchase.product.id}</td>
                  <td>{purchase.product.name}</td>
                  <td>{purchase.quantity}</td>
                  <td>{purchase.product.price}</td>
                  <td>{purchase.product.price * purchase.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </TableContainer>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  background-color: ${COLOR_PALETTE.LIGHT};

/* FOR RESPONSIVENESS */
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
`;

const Wrapper = styled.div`
  width: 80%;
  margin-left: 20%;
  padding: 10px;
`;

const TableContainer = styled.div`
background-color: ${COLOR_PALETTE.WHITE};
margin-top: 20px;
table {
  border-collapse: collapse;
  width: 100%;
}

table th, table td {
  border: 1px solid ${COLOR_PALETTE.BLACK};
}
table td {
  padding: 5px;
}

table th {
  font-weight: bold;
  padding: 10px;
  background-color: ${COLOR_PALETTE.PRIMARY};
  color: ${COLOR_PALETTE.WHITE};
}
table tr:nth-child(even) {
  background-color: ${COLOR_PALETTE.LIGHT};
}
`;
export default PurchasedPage;
