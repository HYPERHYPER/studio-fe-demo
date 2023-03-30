import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserButton = () => {

    const [successMessage, setSuccessMessage] = useState('');


    const buttonStyles = {
        padding: '10px 20px',
        background: 'tomato',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.2rem',
        marginRight: '10px'
    };

    const handleUpdateUser = async () => {


       

        const token = localStorage.getItem('jwt'); 
        const lastName = localStorage.getItem('lastName'); 
        const firstName = localStorage.getItem('firstName'); 
        const capsulePlan = localStorage.getItem('orgPlan'); 
        const orgId = localStorage.getItem('orgId'); 
        const id = localStorage.getItem('id'); 

        const userUpdateData = {
            
                firstName: firstName,
                lastName: lastName,
                capsulePlan: capsulePlan,
                orgId: orgId
            
        };

        try {
            const response = await axios.put(
                `http://localhost:1337/api/users/${id}`, 
                userUpdateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSuccessMessage('User updated successfully');


        } catch (error) {
            console.error(error); 
        }
    };

    return (
        

        <div>
            <button style={buttonStyles} onClick={handleUpdateUser}>Strapi Update</button>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
};

export default UpdateUserButton;

