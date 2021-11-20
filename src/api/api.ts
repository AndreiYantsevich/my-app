import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7e5b4528-2880-4677-b629-b878b7697787'
    },
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
};

export const followAPI = {
    followUsers(id: number) {
        return instance.post(`follow/${id}`, {})
            .then(response => response.data);
    },
    unfollowUsers(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    },
};

export const authAPI = {
    login() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },

};

export const profileAPI = {
    getUserProfile(userId: string) {
        return instance.get(`profile/` + userId)
            .then(response => response.data);
    },
    getUserAvatar(id: number) {
        return instance.get(`profile/` + id)
            .then(response => response.data);
    },
    getUserStatus(userId: string) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateUserStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
            .then(response => response.data);
    },
};