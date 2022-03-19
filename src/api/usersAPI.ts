import {instance} from './api';
import {UserType} from '../types/types';

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetUsersResponseType>(`/users?page=${currentPage}&count=${pageSize}&sortOrder=asc`)
            .then(response => response.data)
    }

}

export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

