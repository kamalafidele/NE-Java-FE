import React from 'react';
import styled from 'styled-components';


import COLOR_PALETTE from '../constants/colors';
import variables from '../constants/variables';

function DashboardTopNav({ user, title }) {
    return (
        <Container>
          <h3>{title}</h3>
          <div className="profile-container">
            <div className="row"> <i className="fa-sharp fa-solid fa-magnifying-glass"></i> </div>
            <div className="row"> <i className="fa-solid fa-bell"></i> </div>
            <div className="row">|</div>
            <div className="profile-details">
                <span>{user.name}</span>
                <img src={ user.picture || variables.DEFAULT_PROFILE } alt="profile" width={50} height={50}/>
            </div>
          </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .profile-container {
        align-items: center;
        display: flex;
        .row {
            padding: 10px;
        }

        i {
            cursor: pointer;
        }
        .profile-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        span {
            margin: 0px 10px 0px 10px;
        }
        img {
            border-radius: 50%;
            border: 1px solid ${COLOR_PALETTE.PRIMARY}
        }
    }
`
export default DashboardTopNav;