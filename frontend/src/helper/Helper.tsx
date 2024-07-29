import axios from 'axios';

export async function getServerData<T>(url: string, callback?: (data: T) => void): Promise<T> {
    try {
        const { data } = await axios.get<T>(url);
        if (callback) callback(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function postServerData<T>(url: string, result: T, callback?: (data: T) => void): Promise<T> {
    try {
        const { data } = await axios.post<T>(url, result);
        if (callback) callback(data);
        return data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}
