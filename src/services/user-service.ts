import axios from 'axios'
import { API_URL } from '../enviroment'
import authHeader from './auth-header'

const getPublicContent = () => {
    return axios.get(API_URL + 'api')
}

const getUserBoard = () => {
    return axios.get(API_URL + 'user', { headers: authHeader() })
}

const getModeratorBoard = () => {
    return axios.get(API_URL + 'mod', { headers: authHeader() })
}

const getAdminBoard = () => {
    return axios.get(API_URL + 'admin', { headers: authHeader() })
}

const exportUserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard
}

export default exportUserService
