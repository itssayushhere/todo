import { useEffect, useState, useCallback, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                credentials: 'include',
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message + '🙁');
            }
            setData(result.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
            if (error.message.includes('Token is expired') || error.message.includes('Invalid token') || error.message.includes("No token, authorization denied")) {
                setTimeout(() => {
                    dispatch({ type: 'LOGOUT' });
                }, 2000);
            }
        }
    }, [url, dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData, trigger]);

    const refresh = () => {
        setTrigger(prev => !prev);
    };

    return [data, loading, error, refresh];
};

export default useFetchData;
