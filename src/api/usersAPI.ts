import {GetUsersResponseType, instance} from './api';

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`/users?page=${currentPage}&count=${pageSize}&sortOrder=asc`)
            .then(response => response.data)
    }

}