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

const editArticle = (
    slug: any,
    title: string,
    description: string,
    body: string,
    tagList: string[]
) => {
    return axios.put(
        API_URL + 'articles/' + slug,
        {
            title,
            description,
            body,
            tagList
        },
        { headers: authHeader() }
    )
}

const deleteArticle = (slug: any) => {
    return axios.delete(API_URL + 'articles/' + slug, { headers: authHeader() })
}

const favoriteArticle = (slug: any) => {
    return axios.post(
        API_URL + 'articles/' + slug + '/favorite',
        { slug },
        {
            headers: authHeader()
        }
    )
}

const unFavoriteArticle = (slug: any) => {
    return axios.delete(API_URL + 'articles/' + slug + '/favorite', {
        headers: authHeader()
    })
}

const logout = () => {
    localStorage.removeItem('user')
    localStorage.setItem('tagIndex', '0')
    localStorage.setItem('tagName', 'All')
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user')!)
}

const deleteUser = (email: string) => {
    return axios.delete(API_URL + 'users/' + email, { headers: authHeader() })
}

const getUsers = () => {
    return axios.get(API_URL + 'users', { headers: authHeader() })
}

const editProfile = (
    username: any,
    email: string,
    bio: string,
    image: string
) => {
    return axios.put(
        API_URL + 'user',
        {
            username,
            email,
            bio,
            image
        },
        { headers: authHeader() }
    )
}

const createTag = (tag: string) => {
    return axios.post(API_URL + 'tags/addNew', { tag })
}

const createComment = (slug: any, body: string) => {
    return axios.post(
        API_URL + 'articles/' + slug + '/comments',
        { body },
        {
            headers: authHeader()
        }
    )
}

const deleteComment = (slug: any, id: any) => {
    return axios.delete(API_URL + 'articles/' + slug + '/comments/' + id, {
        headers: authHeader()
    })
}

const exportAuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    deleteUser,
    getUserInfo,
    createArticle,
    favoriteArticle,
    unFavoriteArticle,
    createTag,
    createComment,
    deleteComment,
    editArticle,
    deleteArticle,
    getUsers,
    editProfile
}

export default exportAuthService
