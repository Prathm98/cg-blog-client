import { useState, useEffect } from 'react';
import axios from 'axios';

if (localStorage.token) {
    axios.defaults.headers.common['authorization'] = localStorage.token
}
axios.defaults.baseURL = 'http://ec2-52-15-74-135.us-east-2.compute.amazonaws.com:3000';

const useAxios = ({ url, method, body = null, headers = null, initialFetch = true }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = (url1=null, body1=null) => {
        setloading(true);
        if(headers){
            headers.authorization = localStorage.token
        }else{
            headers = {
                authorization: localStorage.token
            }
        }
        axios.request({
            url: url1? url1: url,
            method,
            headers: headers, 
            body: body1? body1: body
        }).then((res) => {
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
        // eslint-disable-next-line 
    }, [method, url, body, headers, initialFetch]);

    return { response, error, loading, fetchData };
};

export default useAxios; 