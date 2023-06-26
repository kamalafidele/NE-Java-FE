import React from "react";
import styled from "styled-components";

import COLOR_PALETTE from '../constants/colors';

function Select({ placeHolder, data, onChange, width = 50, ...otherProps }) {
  return (
    <SelectElement onChange={onChange} style={{ width: `${width}%` }} {...otherProps}>
        <option>{placeHolder}</option>
      {data.map((dt, index) => (
        <option key={index} value={dt.id}>
          {dt.name}
        </option>
      ))}
    </SelectElement>
  );
}

const SelectElement = styled.select`
height: 45px;
padding: 5px;
border: solid 1px ${COLOR_PALETTE.GRAY};
border-radius: 7px;
margin: 10px 0px 10px 0px ;
display: block;
outline: 1px ${COLOR_PALETTE.GRAY};
background-color: ${COLOR_PALETTE.LIGHT};
`;

export default Select;
