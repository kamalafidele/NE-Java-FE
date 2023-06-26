import React from 'react';
import styled from 'styled-components';

import COLOR_PALETTE from '../constants/colors';

function AppLogo({ first_part_color = COLOR_PALETTE.BLACK, last_part_color = COLOR_PALETTE.WHITE, font_size = 30, onClick }) {
    return (
        <div style={{ cursor: 'pointer' }} onClick={onClick}>
            <Span style={{ color: first_part_color, fontSize: `${font_size}px` }}>Super</Span>
            <Span style={{ color: last_part_color, fontSize: font_size }}>Market</Span>
        </div>
    );
}

const Span = styled.span`
font-size: 28px;
font-weight: bold;
`
export default AppLogo;