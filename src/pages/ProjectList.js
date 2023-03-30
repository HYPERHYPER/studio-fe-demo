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

function ProjectList() {
    const [projects, setProjects] = useState([]);
    

    useEffect(() => {
        fetchProjects();
    }, []);


    async function fetchProjects() {
        const token = localStorage.getItem('jwt'); 
        const response = await axios.get('http://localhost:1337/api/projects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data.data);
        setProjects(response.data.data);
    }


    return (
        <ProjectListContainerStyle>
            <ProjectListHeaderStyle>Projects</ProjectListHeaderStyle>
            <ProjectListStyle>
                {projects.map(project => (
                    <ProjectItemStyle key={project.id}>{project.attributes.name}</ProjectItemStyle>
                ))}
            </ProjectListStyle>
            <Link to="/">
                <ButtonStyle>Home</ButtonStyle>
            </Link>
        </ProjectListContainerStyle>
    );
}

export default ProjectList;