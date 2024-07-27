import { useEffect, useState, useCallback } from 'react';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(false);

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
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData, trigger]);

    const refresh = () => {
        setTrigger(prev => !prev);
    };

    return [data, loading, error, refresh];
};

export default useFetchData;
