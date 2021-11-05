import {followAPI, usersAPI} from '../../api/api';
import {Dispatch} from 'redux';
import {UsersStateType, UserType} from '../../components/Users/UsersContainer';

export enum UsersEnum {
    FOLLOW = 'FOLLOW',
    UNFOLLOW = 'UNFOLLOW',
    SET_USERS = 'SET_USERS',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT',
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS',
}

export type UsersAction =
    ReturnType<typeof followSuccess> |
    ReturnType<typeof unfollowSuccess> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setUsersTotalCount> |
    ReturnType<typeof toggleIsFetching> |
    ReturnType<typeof toggleFollowingProgress>

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

export default function usersReducer(state: UsersStateType = initialState, action: UsersAction): UsersStateType {
    switch (action.type) {
        case UsersEnum.FOLLOW:
            return {
                ...state,
                users: state.users.map(u => (u.id === action.userID)
                    ? {...u, followed: true}
                    : u
                )
            }
        case UsersEnum.UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => (u.id === action.userID)
                    ? {...u, followed: false}
                    : u
                )
            }
        case UsersEnum.SET_USERS:
            return {...state, users: action.users}
        case UsersEnum.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case UsersEnum.SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case UsersEnum.TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case UsersEnum.TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        default:
            return state
    }
};

//action creators
export const followSuccess = (userID: number) => ({type: UsersEnum.FOLLOW, userID} as const);
export const unfollowSuccess = (userID: number) => ({type: UsersEnum.UNFOLLOW, userID} as const);
export const setUsers = (users: UserType[]) => ({type: UsersEnum.SET_USERS, users} as const);
export const setCurrentPage = (currentPage: number) => ({type: UsersEnum.SET_CURRENT_PAGE, currentPage} as const);
export const setUsersTotalCount = (totalCount: number) => ({
    type: UsersEnum.SET_USERS_TOTAL_COUNT,
    totalCount
} as const);
export const toggleIsFetching = (isFetching: boolean) => ({type: UsersEnum.TOGGLE_IS_FETCHING, isFetching} as const);
export const toggleFollowingProgress = (isFetching: boolean, userID: number) => ({
    type: UsersEnum.TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userID
} as const);


//thunk
export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch<UsersAction>) => {
    dispatch(toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setUsersTotalCount(data.totalCount));
            dispatch(setCurrentPage(currentPage));
        });
};
export const follow = (userID: number) => (dispatch: Dispatch<UsersAction>) => {
    dispatch(toggleFollowingProgress(true, userID));
    followAPI.followUsers(userID).then(data => {
        if (data.resultCode === 0) {
            dispatch(followSuccess(userID));
        }
        dispatch(toggleFollowingProgress(false, userID));
    });
};
export const unfollow = (userID: number) => (dispatch: Dispatch<UsersAction>) => {
    dispatch(toggleFollowingProgress(true, userID));
    followAPI.unfollowUsers(userID).then(data => {
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userID));
        }
        dispatch(toggleFollowingProgress(false, userID));
    });
};