import React from 'react';
import styled from 'styled-components';

import COLOR_PALETTE from '../constants/colors';

function ErrorMessage({ text }) {
    return (
        <Span>{text}</Span>
    );
}

const Span = styled.span`
text-align: center;
color: ${COLOR_PALETTE.DANGER};
font-size: 18px;
`
export default ErrorMessage;