import {UsersActionEnum, UserType} from './users-types';


export const UsersActionCreators = {
    follow: (payload: number) => ({type: UsersActionEnum.FOLLOW, payload} as const),
    unfollow: (payload: number) => ({type: UsersActionEnum.UNFOLLOW, payload} as const),
    setUsers: (users: UserType[]) => ({type: UsersActionEnum.SET_USERS, users} as const),
    setCurrentPage: (payload: number) => ({type: UsersActionEnum.SET_CURRENT_PAGE, payload} as const),
    setUsersTotalCount: (payload: number) => ({type: UsersActionEnum.SET_USERS_TOTAL_COUNT, payload} as const),
    toggleIsFetching: (payload: boolean) => ({type: UsersActionEnum.TOGGLE_IS_FETCHING, payload} as const),
}