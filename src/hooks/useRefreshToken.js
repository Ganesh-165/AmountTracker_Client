import axios from '../api/axios';
import useAuth from './useAuth';

const Url = '/refresh';
const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get(Url,{
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;