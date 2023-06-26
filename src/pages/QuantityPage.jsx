import React, { useEffect, useState } from "react";
import styled from "styled-components";

import authStorage from '../auth/storage';
import Sidebar from "../components/Sidebar";
import COLOR_PALETTE from "../constants/colors";
import DashboardTopNav from "../components/DashboardTopNav";
import quantitiesApi from '../api/quantitiesApi';

import QuantityContext from '../contexts/quantity';
import AddQuantity from "../modals/AddQuantity";
import QuantityItem from "../components/QuantityItem";

function QuantityPage() {
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const strUser = authStorage.getUser();
  const user = JSON.parse(strUser);
  
  const fetchQuantities = async () => {
    setLoading(true);
    const result = await quantitiesApi.getAllQuantities();

    console.log(result.data);
    if (result.ok) {
      setQuantities(result.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchQuantities();
  }, []);


  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <QuantityContext.Provider value={ { quantities, setQuantities } }>
    <Container>
      <Sidebar />
      <Wrapper>
        <DashboardTopNav user={user} title={'Quantities'}/>
        <div className="add-new">
              <div>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "left",
                  }}
                >
                  New Quantity
                </span>
              </div>
              <div className="add-quantity">
                <span style={{ color: COLOR_PALETTE.GRAY }}>
                  Add a new quantity
                </span>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => setIsOpen(true)}
                ></i>
              </div>
            </div>

            <AddQuantity closeModal={closeModal} isOpen={isOpen} />
            <div className="header">
              <h2 style={{}}>This is history of Product Quantities You've added/removed from the shop</h2>
            </div>
            <QuantitiesContainer>
                { quantities.map((quantity, index) => (
                    <QuantityItem quantityData={quantity} key={index}/>
                ))}
            </QuantitiesContainer>
      </Wrapper>
    </Container>
    </QuantityContext.Provider>
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

  .add-new {
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      width: 30%;
      padding: 10px;
      i {
        cursor: pointer;
        background-color: ${COLOR_PALETTE.GRAY};
        padding: 5px;
        border-radius: 15px;
        color: ${COLOR_PALETTE.LIGHT};
      }
    }

    .add-quantity {
      border-bottom: 2px solid ${COLOR_PALETTE.GRAY};
    }
  }

  .header {
    margin-top: 10px;
    padding: 20px;
    background-color: ${COLOR_PALETTE.WHITE};
    h2 {
      color: ${COLOR_PALETTE.LIGHT_DARK}
    }
  }
`;

const QuantitiesContainer = styled.div`
width: 100%;
background-color: ${COLOR_PALETTE.WHITE};
/* margin-top: 20px; */
margin-left: 0px;
margin-right: 0px;
padding: 10px;

display: flex;
justify-content: space-between;
flex-wrap: wrap;

`;
export default QuantityPage;
