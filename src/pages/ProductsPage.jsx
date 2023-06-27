import React, { useEffect, useState } from "react";
import styled from "styled-components";

import authStorage from '../auth/storage';
import Sidebar from "../components/Sidebar";
import COLOR_PALETTE from "../constants/colors";
import DashboardTopNav from "../components/DashboardTopNav";
import productsApi from '../api/productsApi';
import purchaseApi from "../api/purchaseApi";

import AddProduct from "../modals/AddProduct";
import ProductsContext from "../contexts";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const strUser = authStorage.getUser();
  const user = JSON.parse(strUser);
  
  const fetchProducts = async () => {
    setLoading(true);
    const result = await productsApi.getAllProducts();

    if (result.ok) {
      setProducts(result.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);


  const closeModal = () => {
    setIsOpen(false);
  };

  async function buyProduct(product) {
    const date = new Date();
    const quantity = 1;
    
    const result = await purchaseApi.purchaseProduct(product.id, quantity, date);
    console.log('returned: ',result.data);
    if (result.ok) console.log('bought: ');
    else console.log('not bought');

  }

  return (
    <ProductsContext.Provider value={ { products, setProducts } }>
    <Container>
      <Sidebar />
      <Wrapper>
        <DashboardTopNav user={user} title={'Products'}/>
        { user.roles.includes('ROLE_ADMIN') && (
                  <div className="add-new">
                  <div>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "left",
                      }}
                    >
                      New Product
                    </span>
                  </div>
                  <div className="add-product">
                    <span style={{ color: COLOR_PALETTE.GRAY }}>
                      Add a new product
                    </span>
                    <i
                      className="fa-solid fa-plus"
                      onClick={() => setIsOpen(true)}
                    ></i>
                  </div>
                </div>
        )}

            <AddProduct closeModal={closeModal} isOpen={isOpen} />
            <ProductsContainer>
              { products.map((product, index) => (
                <ProductCard 
                productData={product}
                key={index} 
                addToCart={buyProduct}/>
              ))}
            </ProductsContainer>
      </Wrapper>
    </Container>
    </ProductsContext.Provider>
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

    .add-product {
      border-bottom: 2px solid ${COLOR_PALETTE.GRAY};
    }
  }
`;

const ProductsContainer = styled.div`
width: 100%;
background-color: ${COLOR_PALETTE.WHITE};
margin-top: 20px;
margin-left: 0px;
margin-right: 0px;
padding: 10px;

display: flex;
justify-content: space-between;
flex-wrap: wrap;

`;
export default ProductsPage;
