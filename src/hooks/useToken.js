import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return tokenString
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken, role, id, token) => {
        if (userToken == null) {
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('role')
            sessionStorage.removeItem('id')
            sessionStorage.removeItem('token')
            setToken('')
            return
        }
        sessionStorage.setItem('username', JSON.stringify(userToken));
        sessionStorage.setItem('role', JSON.stringify(role));
        sessionStorage.setItem('id', JSON.stringify(id));
        sessionStorage.setItem('token', JSON.stringify(token));
        setToken({userToken, role, id, token});
    };

    return {
        setToken: saveToken,
        token
    }
}