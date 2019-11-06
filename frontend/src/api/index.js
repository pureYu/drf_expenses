//import React from 'react';
import axios from 'axios';


const BASE_API_URL = 'http://127.0.0.1:8000/api/';
const BASE_API_URL_EXPENSES = `${BASE_API_URL}expenses/`;
const BASE_API_URL_USERS = `${BASE_API_URL}users/`;
const BASE_API_URL_AUTH_REG = `${BASE_API_URL}rest-auth/registration/`;
const BASE_API_URL_AUTH_LOGIN = `${BASE_API_URL}rest-auth/login/`;
const BASE_API_URL_AUTH_LOGOUT = `${BASE_API_URL}rest-auth/logout/`;
const BASE_API_URL_AUTH_USER = `${BASE_API_URL}rest-auth/user/`;

const buildHeaders = (key) => {
    const headers = {"Content-Type": "application/json"};
    if (key) {
      headers["Authorization"] = `Token ${key}`;
    }
    return headers;
}

//  Authentication
const postLogin = (username, password) => {
    const headers = buildHeaders();
    const data = JSON.stringify({username, password});
    const response = axios.post(BASE_API_URL_AUTH_LOGIN, data, {headers });
    return response;
}

const postLogout = () => {
    const headers = buildHeaders();
    const response = axios.post(BASE_API_URL_AUTH_LOGOUT, {headers });
    return response;
}

const postRegister = (data) => {
    const headers = buildHeaders();
    const response = axios.post(BASE_API_URL_AUTH_REG, data, {headers });
    return response;
}

const getAuthUserData = (key) => {
    const headers = buildHeaders(key);
    const response = axios.get(BASE_API_URL_AUTH_USER, {headers });
    return response;
}

//  Expenses - CRUD
const getExpenses = async (key) => {
    const headers = buildHeaders(key);
    const response = await axios.get(BASE_API_URL_EXPENSES, {headers });
    return response;
}

const postExpense = (key, data) => {
    const headers = buildHeaders(key);
    const response = axios.post(BASE_API_URL_EXPENSES, data, {headers });
    return response;
}

const putExpense = (key, item_id, data) => {
    const headers = buildHeaders(key);
    const response = axios.put(`${BASE_API_URL_EXPENSES}${item_id}/`, data, {headers });
    return response;
}

const deleteExpense = (key, item_id) => {
    const headers = buildHeaders(key);
    const response = axios.delete(`${BASE_API_URL_EXPENSES}${item_id}/`, {headers });
    return response;
}

//  Users - CRUD
const getUsers = async (key) => {
    const headers = buildHeaders(key);
    const response = await axios.get(BASE_API_URL_USERS, {headers });
    return response;
}

const postUser = (key, data) => {
    const headers = buildHeaders(key);
    const response = axios.post(BASE_API_URL_USERS, data, {headers });
    return response;
}

const putUser = (key, item_id, data) => {
    const headers = buildHeaders(key);
    const response = axios.put(`${BASE_API_URL_USERS}${item_id}/`, data, {headers });
    return response;
}

const deleteUser = (key, item_id) => {
    const headers = buildHeaders(key);
    const response = axios.delete(`${BASE_API_URL_USERS}${item_id}/`, {headers });
    return response;
}

export {postLogin, postLogout, postRegister, getAuthUserData
      , getExpenses, postExpense, putExpense, deleteExpense
      , getUsers, postUser, putUser, deleteUser};