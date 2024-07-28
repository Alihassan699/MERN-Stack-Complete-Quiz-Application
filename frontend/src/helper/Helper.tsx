import axios from 'axios';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function CheckUserExit({ children }) {
    const auth = useSelector(state => state.result.userId);
    return auth ? children : <Navigate to="/" replace={true} />;
}

export async function getServerData(url: string, callback?: (data: any) => void) {
    try {
        const { data } = await axios.get(url);
        return callback ? callback(data) : data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function postServerData(url: string, result: any, callback?: (data: any) => void) {
    try {
        const { data } = await axios.post(url, result);
        return callback ? callback(data) : data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}
