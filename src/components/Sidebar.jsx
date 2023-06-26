import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import COLOR_PALETTE from "../constants/colors";
import Logo from "../components/Logo";

const Sidebar = () => {
  return (
    <Container>
      <div style={{ marginTop: 30 }}>
        <Logo first_part_color={COLOR_PALETTE.PRIMARY} />
      </div>
      <Content>
        <div className="top-links">
          <ul>
            <li>
              <NavLink
                to={"/products"}
                className={(navData) =>
                  navData.isActive ? "active" : "inactive"
                }
              >
                <i className="fa-sharp fa-solid fa-shop"></i>{" "}
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/purchased"}
                className={(navData) =>
                  navData.isActive ? "active" : "inactive"
                }
              >
                <i className="fas fa-chart-pie"></i>{" "}
                Purchased
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/quantities"}
                className={(navData) =>
                  navData.isActive ? "active" : "inactive"
                }
              >
                <i className="fa fa-area-chart"></i>{" "}
                Quantities
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="bottom-links">
          <ul>
            <li>
              <NavLink
                to={"/account"}
                className={(navData) =>
                  navData.isActive ? "active" : "inactive"
                }
              >
                <i className="fa-solid fa-user" aria-hidden="true"></i> My account
              </NavLink>
            </li>
          </ul>
        </div>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 20%;
  height: 100%;
  position: fixed;
  padding: 10px;
  left: 0;
  right: 0;
  background: ${COLOR_PALETTE.BLACK};
  color: ${COLOR_PALETTE.LIGHT};
  a {
    text-decoration: none;
    color: ${COLOR_PALETTE.LIGHT};
  }
`;

const Content = styled.div`
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;

  ul {
    list-style: none;
    width: 100%;
  }
  ul li {
    padding-top: 20px;
    font-size: 20px;
  }
  ul li i {
    padding-right: 10px;
  }
  ul li a.active {
    color: ${COLOR_PALETTE.PRIMARY};
  }
`;
export default Sidebar;
