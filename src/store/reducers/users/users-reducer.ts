import {UsersAction, UsersActionEnum, UsersStateType} from './users-types';


const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
}


export default function usersReducer(state: UsersStateType = initialState, action: UsersAction): UsersStateType {

    switch (action.type) {
        case UsersActionEnum.FOLLOW:
            return {
                ...state,
                users: state.users
                    .map(u => (u.id === action.payload)
                        ? {...u, followed: true}
                        : u
                    )
            }
        case UsersActionEnum.UNFOLLOW:
            return {
                ...state,
                users: state.users
                    .map(u => (u.id === action.payload)
                        ? {...u, followed: false}
                        : u
                    )
            }
        case UsersActionEnum.SET_USERS:
            return {...state, users: action.users}
        case UsersActionEnum.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case UsersActionEnum.SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.payload
            }
        case UsersActionEnum.TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}