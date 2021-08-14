import axios from 'axios'
import { API_URL } from '../enviroment'

const register = (username: string, email: string, password: string) => {
    return axios.post(API_URL + 'users', {
        username,
        email,
        password
    })
}

const login = (email: string, password: string) => {
    return axios
        .post(API_URL + 'login', {
            email,
            password
        })
        .then((response) => {
            if (response.data) {
                console.log('ADASDADADADAD')
                localStorage.setItem('user', JSON.stringify(response.data))
                localStorage.setItem('token', response.data.accessToken)
            }

            return response.data
        })
}

const getUserInfo = (email: string) => {
    return axios.post(API_URL + 'user', { email }).then((response) => {
        if (response.data) {
            console.log('Get user info')
            localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('token', response.data.accessToken)
        }

        return response.data
    })
}

const logout = () => {
    localStorage.removeItem('user')
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user')!)
}

const deleteUser = (email: string) => {}

const exportAuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    deleteUser
}

export default exportAuthService
