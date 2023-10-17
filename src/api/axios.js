import axios from 'axios';

export default axios.create({
    baseURL:'https://amounttracker-server.onrender.com',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    credentials: 'include'
});
