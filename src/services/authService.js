import http from './httpService';
import config from '../config.json';
import jwtDecode from 'jwt-decode';

const apiEndpoint = config.apiUrl + '/auth';
const tokenKey = 'token';

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    // localStorage = database - setItem(key, vlaue)
    localStorage.setItem(tokenKey, jwt);
}

export function loginwithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        // Get the json web token from the local storage
        const jwt = localStorage.getItem(tokenKey);
        // Decode it to get the current user
        return jwtDecode(jwt);
      }
      // If we don't have a valid jwt in local storage
    catch (ex) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,loginwithJwt, logout, getCurrentUser, getJwt
}