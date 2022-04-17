import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('username');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken, role) => {
        if (userToken == null) {
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('role')
            setToken('')
            return
        }
        sessionStorage.setItem('username', JSON.stringify(userToken));
        sessionStorage.setItem('role', JSON.stringify(role));
        setToken({userToken, role});
    };

    return {
        setToken: saveToken,
        token
    }
}