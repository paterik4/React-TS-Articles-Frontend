import axios from 'axios'
import { API_URL } from '../enviroment'
import authHeader from './auth-header'

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

const createArticle = (
    title: string,
    description: string,
    body: string,
    tagList: string[]
) => {
    return axios.post(
        API_URL + 'articles',
        {
            title,
            description,
            body,
            tagList
        },
        { headers: authHeader() }
    )
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
    deleteUser,
    createArticle
}

export default exportAuthService
