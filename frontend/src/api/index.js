import React from 'react';
import axios from 'axios';


const BASE_API_URL = 'http://127.0.0.1:8000/api/';
const BASE_API_URL_EXPENSES = `${BASE_API_URL}expenses/`;
//const BASE_API_URL_AUTH_REG = `${BASE_API_URL}rest-auth/registration/`;
//const BASE_API_URL_AUTH_LOGIN = `${BASE_API_URL}rest-auth/login/`;
//const BASE_API_URL_AUTH_LOGOUT = `${BASE_API_URL}rest-auth/logout/`;
const BASE_API_URL_AUTH_USER = `${BASE_API_URL}rest-auth/user/`;

const buildHeaders = (key) => {
    const headers = {"Content-Type": "application/json"};
    if (key) {
      headers["Authorization"] = `Token ${key}`;
    }
    return headers;
}

const getExpenses = async (key) => {
//    const headers = buildHeaders(key);
//    const response = await fetch(`${BASE_API_URL}expenses/`, {headers });
//    return response.json();
    const headers = buildHeaders(key);
    console.log('headers: ', headers);
    const response = await axios.get(BASE_API_URL_EXPENSES, {headers });
//    return response.data;
    return response;
}

const getUserData = (key) => {
    const headers = buildHeaders(key);
    const response = axios.get(BASE_API_URL_AUTH_USER, {headers });
    return response;

//    axios.get(BASE_API_URL_EXPENSES, {headers: headers})
//      .then(response => {
//        const user = response.data;
//        dispatch(fetchUserFulfilled(user));
//      })
//      .catch(err => {
//        dispatch(fetchUserRejected(err));
//      })

}

export {getExpenses, getUserData};