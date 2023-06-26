import React from 'react';
import styled from 'styled-components';

import COLOR_PALETTE from '../constants/colors';

function Input({ type, placeHolder, onChange, width = 50, ...otherProps }) {
    return (
        <InputElement type={type} placeholder={placeHolder} style={{ width: `${width}%` }} onChange={onChange} {...otherProps}/>
    );
}

const InputElement = styled.input`
height: 45px;
padding: 5px;
border: solid 1px ${COLOR_PALETTE.GRAY};
border-radius: 7px;
margin: 10px 0px 10px 0px ;
display: block;
outline: 1px ${COLOR_PALETTE.GRAY};
background-color: ${COLOR_PALETTE.LIGHT};
`
export default Input;