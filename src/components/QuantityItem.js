import React from 'react';
import styled from 'styled-components';

function QuantityItem({ quantityData }) {
    return (
        <Container>
            <p><strong>Operation: </strong> {quantityData.operation}</p>
            <p><strong>Date: </strong> {new Date(quantityData.date).toDateString() }</p>
            <p><strong>Product Name: </strong> { quantityData.product.name }</p>
            <p><strong>Product Type: </strong> { quantityData.product.type }</p>
            <p><strong>Value: </strong> { quantityData.quantity }</p>
        </Container>
    );
}

const Container = styled.div`
box-shadow: 0 10px 6px -6px #777;
width: 100%;
border-radius: 10px;
padding: 10px;

p {
    margin: 10px;
}
`
export default QuantityItem;