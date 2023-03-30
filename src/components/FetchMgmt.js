import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;

  p {
    margin: 8px 0;
    font-size: 16px;
  }

  p:first-child {
    font-weight: bold;
  }
`;


function FetchMgmt() {
    const [orgId, setOrgId] = useState('');
    const [orgName, setOrgName] = useState('');
    const [orgPlan, setOrgPlan] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    

    useEffect(() => {
        // Make the API request when the component mounts
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            // Make the API request using Axios
            const response = await axios.get('http://localhost:4000/capsule/v1/users/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            setOrgId(response.data.organization_id);
            setOrgPlan(response.data.organization_plan);
            setOrgName(response.data.organization_name);
            setFirstName(response.data.first_name);
            setLastName(response.data.last_name);

            localStorage.setItem('orgId', response.data.organization_id);
            localStorage.setItem('orgPlan', response.data.organization_plan);
            localStorage.setItem('firstName', response.data.first_name);
            localStorage.setItem('lastName', response.data.last_name);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Container>
            <p>Organization: {orgId}</p>
            <p>Name: {orgName}</p>
            <p>Capsule Plan: {orgPlan}</p>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
        </Container>
    );
}

export default FetchMgmt;
