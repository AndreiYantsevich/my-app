import axios from 'axios';

export const getUsers = (currentPage = 1, pageSize = 10) => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {
        withCredentials: true
    })
        .then(response => response.data);
}

export const followUsers = (id: number) => {
    return axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {}, {
        withCredentials: true,
        headers: {
            'API-KEY': '7e5b4528-2880-4677-b629-b878b7697787'
        }
    })
        .then(response => response.data);
}

export const unfollowUsers = (id: number) => {
    return axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {
        withCredentials: true,
        headers: {
            'API-KEY': '7e5b4528-2880-4677-b629-b878b7697787'
        }
    })
        .then(response => response.data);
}