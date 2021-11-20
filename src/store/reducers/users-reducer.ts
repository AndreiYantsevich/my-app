import {followAPI, usersAPI} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {InferActionsTypes, RootStateType} from '../store';
import {UserType} from '../../types/types';

export enum UsersEnum {
    FOLLOW = 'FOLLOW',
    UNFOLLOW = 'UNFOLLOW',
    SET_USERS = 'SET_USERS',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT',
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS',
}

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
};

export default function usersReducer(state = initialState, action: ActionsType): InitialStateType {
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
export const actions = {
    followSuccess: (userID: number) => ({
        type: UsersEnum.FOLLOW,
        userID
    } as const),
    unfollowSuccess: (userID: number) => ({
        type: UsersEnum.UNFOLLOW,
        userID
    } as const),
    setUsers: (users: UserType[]) => ({
        type: UsersEnum.SET_USERS,
        users
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: UsersEnum.SET_CURRENT_PAGE,
        currentPage
    } as const),
    setUsersTotalCount: (totalCount: number) => ({
        type: UsersEnum.SET_USERS_TOTAL_COUNT,
        totalCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: UsersEnum.TOGGLE_IS_FETCHING,
        isFetching
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userID: number) => ({
        type: UsersEnum.TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userID
    } as const),
}


//thunk
export const getUsers = (currentPage: number, pageSize: number): UsersThunk => dispatch => {
    dispatch(actions.toggleIsFetching(true));
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(actions.toggleIsFetching(false));
            dispatch(actions.setUsers(data.items));
            dispatch(actions.setUsersTotalCount(data.totalCount));
            dispatch(actions.setCurrentPage(currentPage));
        });
};
export const follow = (userID: number): UsersThunk => dispatch => {
    dispatch(actions.toggleFollowingProgress(true, userID));
    followAPI.followUsers(userID).then(data => {
        if (data.resultCode === 0) {
            dispatch(actions.followSuccess(userID));
        }
        dispatch(actions.toggleFollowingProgress(false, userID));
    });
};
export const unfollow = (userID: number): UsersThunk => dispatch => {
    dispatch(actions.toggleFollowingProgress(true, userID));
    followAPI.unfollowUsers(userID).then(data => {
        if (data.resultCode === 0) {
            dispatch(actions.unfollowSuccess(userID));
        }
        dispatch(actions.toggleFollowingProgress(false, userID));
    });
};

export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof actions>
type UsersThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType>