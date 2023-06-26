import React from 'react';
import styled from 'styled-components';

function Pagination({ itemsPerPage, totalItems, paginate }) {
    const items =  [];
    for (let  i = 1; i <= Math.floor(totalItems / itemsPerPage); i++) {
        items.push(i);
    }

    return (
        <Container>
            { items.map((num) => (
                <button 
                key={num} 
                onClick={() => paginate(num)}>{num}</button>
            ))}
        </Container>
    );
}

const Container = styled.div`
display: flex;
button {
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: dodgerblue;
    background-color: white;
    border: gray 1px solid;
}
`
export default Pagination;