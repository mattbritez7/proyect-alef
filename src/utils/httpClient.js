const axios = require('axios');
const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

module.exports = httpClient;

console.log(process.env.REACT_APP_API_BASE_URL)