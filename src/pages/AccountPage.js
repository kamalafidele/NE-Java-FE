import React from 'react';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import authStorage from '../auth/storage';
import DashboardTopNav from '../components/DashboardTopNav';
import Button from '../components/Button';

function AccountPage() {
    const navigate = useNavigate();
    const token = authStorage.getToken();
    const user = jwtDecode(token);

    const handleLogout = (e) => {
        e.preventDefault();
        
        authStorage.removeToken();
        navigate('/');
    }

    return (
        <Container>
            <Sidebar/>
            <Wrapper>
                <DashboardTopNav user={user} title={'Account'}/>
                <Content>
                    <Button text={'Logout'} onClick={handleLogout} width={20}/>
                </Content>
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
padding: 0;
margin: 0;
display: flex;
flex-direction: row;
`;

const Wrapper = styled.div`
width: 80%;
margin-left: 20%;
padding: 10px;
`
const Content = styled.div``
export default AccountPage;