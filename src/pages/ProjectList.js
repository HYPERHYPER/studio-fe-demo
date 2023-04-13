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


function ProjectList(props) {
    const [projects, setProjects] = useState([]);
    const { orgPath } = props.location.state;
    

    useEffect(() => {
        fetchProjects();
    }, []);


    async function fetchProjects() {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const path = orgPath ? orgPath : 'projects';
        const token = localStorage.getItem('jwt'); 
        const response = await axios.get(`${backendUrl}/api/${path}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setProjects(response.data);
        console.log(response.data);
    }


    return (
        <ProjectListContainerStyle>
            <ProjectListHeaderStyle>Strapi Projects</ProjectListHeaderStyle>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Org ID</th>
                        <th>Submission</th>
                    </tr>
                </thead>
                <tbody>
    
                        {projects.map(project => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.org_id}</td>
                                <td>{JSON.stringify(project.composition)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
      







            <Link to="/">
                <ButtonStyle>Home</ButtonStyle>
            </Link>
        </ProjectListContainerStyle>
    );
}

export default ProjectList;