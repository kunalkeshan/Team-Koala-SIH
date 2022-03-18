import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:5000';

const client = axios.create({ baseURL });

const backend = async (options) => {
    const onSuccess = response => response.data;
    const onError = error => {
        if (error.isAxiosError && !error.response) return error.toJSON().message;
        if (error.response) return error.response.data;
        return error;
    };;

    try {
        const response = await client(options);
        return onSuccess(response);
    } catch (error) {
        return Promise.reject(onError(error));
    }
}

export default backend;