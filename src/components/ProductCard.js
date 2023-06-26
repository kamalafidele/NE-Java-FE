import React from 'react';
import styled from 'styled-components';
import COLOR_PALETTE from '../constants/colors';

function ProductCard({ width = 30, productData, addToCart }) {
    return (
        <Container style={{ width: `${width}%`}}>
            <div className='img-container'>
                <img src={productData.image} alt={productData.name}/>
            </div>
            <p><strong>{productData.name}</strong></p>
            <p><strong>Price: </strong> {productData.price} Frw</p>
            <button onClick={() => addToCart(productData)}>Add to Cart</button>
        </Container>
    );
}

const Container = styled.div`
border-radius: 10px;
margin-top: 10px;
/* padding: 5px; */
box-shadow:   0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12);

.img-container {
    width: 100%;
    img {
        width: 100%;
        height: auto;
    }
}
p {
    padding: 5px;
}
button {
    width: 30%;
    border: none;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    color: ${COLOR_PALETTE.WHITE};
    background-color: ${COLOR_PALETTE.GREEN};
    margin: 5px;
    cursor: pointer;
}
`;
export default ProductCard;