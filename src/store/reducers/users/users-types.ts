import {UsersActionCreators} from './users-action-creators';


export interface UsersStateType {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

export type UserType = {
    id: number;
    name: string;
    status?: string;
    photos: {
        small?: string;
        large?: string;
    }
    followed: boolean;
}

export enum UsersActionEnum {
    FOLLOW = 'FOLLOW',
    UNFOLLOW = 'UNFOLLOW',
    SET_USERS = 'SET_USERS',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT',
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
}

export type UsersAction = (
    ReturnType<typeof UsersActionCreators.follow> |
    ReturnType<typeof UsersActionCreators.unfollow> |
    ReturnType<typeof UsersActionCreators.setUsers> |
    ReturnType<typeof UsersActionCreators.setCurrentPage> |
    ReturnType<typeof UsersActionCreators.setUsersTotalCount> |
    ReturnType<typeof UsersActionCreators.toggleIsFetching>
    )