import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7e5b4528-2880-4677-b629-b878b7697787'
    },
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`);
    },
};

export const followAPI = {
    followUsers(id: number) {
        return instance.post(`follow/${id}`, {});
    },
    unfollowUsers(id: number) {
        return instance.delete(`follow/${id}`);
    },
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    },
};

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/` + userId);

    },
    getUserStatus(userId: number) {
        return instance.get(`profile/status/` + userId);

    },
    updateUserStatus(status: string) {
        return instance.put(`profile/status`, {status: status});

    },
    updateUserPhoto(photo: File) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};