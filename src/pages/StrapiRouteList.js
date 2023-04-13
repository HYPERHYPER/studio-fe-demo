import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const RouteListContainerStyle = styled.div`
  font-family: Arial;
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(to bottom right, #00ccff, #cc00ff);

`;

const RouterListStyle = styled.ul`

`;

const ButtonStyle = styled.button`
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    borderRadius: 5px;
    cursor: pointer;
    marginRight: 10px;
    margin: 2rem;
`;


function StrapiRouteList(props) {
    const [routes, setRoutes] = useState([]);


    useEffect(() => {
        fetchRoutes();
    }, []);


    async function fetchRoutes() {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`${backendUrl}/users-permissions/routes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setRoutes(Object.values(response.data.routes));

        console.log(Object.values(response.data.routes))
    }


    return (
        <RouteListContainerStyle>
            <Link to="/">
                <ButtonStyle>Home</ButtonStyle>
            </Link>
            <RouterListStyle>
                {routes.map(apiRoutes =>
                    apiRoutes.map(route =>
                        <li key={route.path}>
                            {route.method} {route.path}
                        </li>
                    )
                )}
            </RouterListStyle>
        </RouteListContainerStyle>
    );
}

export default StrapiRouteList;