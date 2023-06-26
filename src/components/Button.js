import React from 'react';
import styled from 'styled-components';

import COLOR_PALETTE from '../constants/colors';

function Button({ onClick, text, width = 50, background = COLOR_PALETTE.PRIMARY, border = 'none', ...otherProps }) {
    return (
        <ButtonElement onClick={onClick} style={{ width: `${width}%`, background, border }} {...otherProps}>{text}</ButtonElement>
    );
}
const ButtonElement = styled.button`
color: ${COLOR_PALETTE.WHITE};
text-align: center;
height: 45px;
border-radius: 7px;
font-size: 18px;
cursor: pointer;
`;

export default Button;
