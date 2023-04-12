import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";


const backendUrl = process.env.REACT_APP_PAYLOAD_BACKEND_URL;

const PayloadRedirect = (props) => {
    const [text, setText] = useState('Loading...');
    const location = useLocation();
    const params = useParams();
    const history = useHistory();


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const jwt = urlParams.get('token');
        const path = '/api/users/me';
        const url = `${backendUrl}${path}`;

        fetch(url, {
            headers: {
                'Authorization': `JWT ${jwt}`
            }
        })
        .then(res => {

            console.log(res);
            if (res.status !== 200) {
                throw new Error(`Couldn't fetch user from Payload. Status: ${res.status}`);
            }
            return res;
        })
        .then(res => res.json())
        .then(res => {
            

            localStorage.setItem('payload_jwt', jwt);
            localStorage.setItem('id', res.user.id);
            localStorage.setItem('payload_username', res.user.firstName);
            setText('You have been successfully logged in Payload studio. You will be redirected in a few seconds...');
            setTimeout(() => history.push('/payload'), 3000); // Redirect to homepage after 3 sec
        })
        .catch(err => {
            console.log(err);
            setText('An error occurred, please see the developer console.')
        });
    }, [history, location.search, params.providerName]);

    return <p>{text}</p>
};

export default PayloadRedirect;
