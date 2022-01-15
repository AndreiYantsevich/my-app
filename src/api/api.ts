import axios from 'axios';
import {
    APIResponseType,
    PhotosType,
    ProfileType,
    UserType
} from '../types/types';

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
        return instance.get<APIResponseType<{ id: string, email: string, login: string }>>(`/auth/me`)
            .then(response => response.data)
    },

    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<APIResponseType<{ userId: string }>>(`/auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(response => response.data)
    },

    logout() {
        return instance.delete<APIResponseType>(`/auth/login`)
            .then(response => response.data)
    }
}

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`/users?page=${currentPage}&count=${pageSize}&sortOrder=asc`)
            .then(response => response.data)
    }

}

export const profileAPI = {
    getUser(userId: string) {
        return instance.get<ProfileType>(`/profile/${userId}`)
            .then(response => response.data)
    },

    getStatus(userId: string) {
        return instance.get<string>(`/profile/status/${userId}`)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instance.put<APIResponseType>(`/profile/status`, {status})
            .then(response => response.data)
    },

    savePhoto(file: File) {
        let formData = new FormData()
        formData.append('image', file)
        return instance.put<APIResponseType<{ photos: PhotosType }>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => response.data)
    },

    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`/profile`, profile)
            .then(response => response.data)
    }
}

export const followAPI = {
    unfollowUser(userId: string) {
        return instance.delete<APIResponseType>(`/follow/${userId}`)
            .then(response => response.data)
    },

    followUser(userId: string) {
        return instance.post<APIResponseType>(`/follow/${userId}`)
            .then(response => response.data)
    }

}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>('/security/get-captcha-url')
            .then(response => response.data)
    }

}


//Types
type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}





