import {APIResponseType, instance} from './api';

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