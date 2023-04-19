import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-52-15-74-135.us-east-2.compute.amazonaws.com:3000';

const useAxios = ({ url, method, body = null, headers = null, initialFetch = true }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](url, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        if(initialFetch)
            fetchData();
    }, [method, url, body, headers, initialFetch]);

    return { response, error, loading, fetchData };
};

export default useAxios;