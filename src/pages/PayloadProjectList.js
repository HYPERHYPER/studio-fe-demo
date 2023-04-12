import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



const ProjectListContainerStyle = styled.div`
  font-family: Arial;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(to bottom right, #00ccff, #cc00ff);

`;

const ProjectListHeaderStyle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

`;

const ButtonStyle = styled.button`
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    borderRadius: 5px;
    cursor: pointer;
    marginRight: 10px;
`;

const ProjectListStyle = styled.ul`

`;

const ProjectItemStyle = styled.li`

`;

function PayloadProjectList(props) {
    const [projects, setProjects] = useState([]);
    const { orgPath } = props.location.state;


    useEffect(() => {
        fetchProjects();
    }, []);


    async function fetchProjects() {
        const backendUrl = process.env.REACT_APP_PAYLOAD_BACKEND_URL;
        const path = orgPath ? orgPath : 'projects';
        const token = localStorage.getItem('payload_jwt');
        const response = await axios.get(`${backendUrl}/api/${path}`, {
            headers: {
                Authorization: `JWT ${token}`
            }
        });

        setProjects(response.data.docs);
    }


    return (
        <ProjectListContainerStyle>
            <ProjectListHeaderStyle>Payload Projects</ProjectListHeaderStyle>
            <ProjectListStyle>
                {projects.map(project => (
                    <ProjectItemStyle key={project.id}>
                        {project.name}
                    </ProjectItemStyle>

                ))}
            </ProjectListStyle>
            <Link to="/payload">
                <ButtonStyle>Home</ButtonStyle>
            </Link>
        </ProjectListContainerStyle>
    );
}

export default PayloadProjectList;