import axios from 'axios';
import {ProfileType} from '../types/types';

// axios general settings, axios params -> baseUrl and config
// instance makes auto concat for baseUrl and another axios config
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '7e5b4528-2880-4677-b629-b878b7697787'
    }
})

export const authAPI = {
    me() {
        return instance.get(`/auth/me`)
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post(`/auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },

    logout() {
        return instance.delete(`/auth/login`)
            .then(response => response.data)
    }
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}&sortOrder=asc`)
            .then(response => response.data)
    }

}

export const profileAPI = {
    getUser(userId: string) {
        return instance.get(`/profile/${userId}`)
    },

    getStatus(userId: string) {
        return instance.get(`/profile/status/${userId}`)
    },

    updateStatus(status: string) {
        return instance.put(`/profile/status`, {status})
    },

    savePhoto(file: File) {
        let formData = new FormData()
        formData.append('image', file)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`/profile`, profile)
    }
}

export const followAPI = {

    unfollowUser(userId: string) {
        return instance.delete(`/follow/${userId}`)
    },

    followUser(userId: string) {
        return instance.post(`/follow/${userId}`)
    }

}

export const securityAPI = {

    getCaptchaUrl() {
        return instance.get('/security/get-captcha-url')
    }

}





