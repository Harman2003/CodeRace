import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            headers: {
            "Content-Type": "application/json"
        },
            withCredentials: true
        });
        setAuth(prev => {
            localStorage.setItem('auth', JSON.stringify({user:response.data.username, accessToken: response.data.accessToken}))
            return {user:response.data.username, accessToken: response.data.accessToken}
        })
        return response.data.accessToken
    }
    return refresh;
}

export default useRefreshToken
