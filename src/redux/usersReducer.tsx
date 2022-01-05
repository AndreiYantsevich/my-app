import {followAPI, usersAPI} from '../api/api';
import {UsersStructureType} from '../types/types';
import {ThunkType} from './redux-store';
import {Dispatch} from 'react';
import {updateObjectInArray} from '../utils/helpers/object-helpers';

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS'

const initialState = {
    users: [] as Array<UsersStructureType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

const usersReducer = (state = initialState, action: UsersActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}

//Action
export const followSuccessAC = (userId: string) => ({type: FOLLOW, userId} as const)
export const unFollowSuccessAC = (userId: string) => ({type: UNFOLLOW, userId} as const)
export const setUsersAC = (users: Array<UsersStructureType>) => ({
    type: SET_USERS,
    users
} as const)
export const setCurrentPageAC = (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage
} as const)
export const setTotalCountAC = (totalCount: number) => ({
    type: SET_TOTAL_COUNT,
    totalCount
} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
} as const)
export const toggleFollowingInProgressAC = (isFetching: boolean, userId: number) => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId
} as const)

//Thunk
export const requestUsersTC = (page: number, pageSize: number): ThunkType => async dispatch => {
    // show preloader
    dispatch(toggleIsFetchingAC(true))
    dispatch(setCurrentPageAC(page))
    const response = await usersAPI.getUsers(page, pageSize)
    // hide preloader
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAC(response.items))
    dispatch(setTotalCountAC(response.totalCount))
}
const followUnfollowFlow = async (dispatch: Dispatch<UsersActionsType>, userId: string, apiMethod: (userId: string) => Promise<any>, actionCreator: (userID: string) => UsersActionsType) => {
    // disable btn during server response
    dispatch(toggleFollowingInProgressAC(true, +userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    // activate btn after server response
    dispatch(toggleFollowingInProgressAC(false, +userId))
}
export const followUsersTC = (userId: string): ThunkType => async dispatch => {
    await followUnfollowFlow(dispatch, userId, followAPI.followUser.bind(followAPI), followSuccessAC)
}
export const unfollowUsersTC = (userId: string): ThunkType => async dispatch => {
    await followUnfollowFlow(dispatch, userId, followAPI.unfollowUser.bind(followAPI), unFollowSuccessAC)
}

export default usersReducer;


//Types
type InitialStateType = typeof initialState;
export type UsersActionsType =
    ReturnType<typeof followSuccessAC> |
    ReturnType<typeof unFollowSuccessAC> |
    ReturnType<typeof setUsersAC> |
    ReturnType<typeof setCurrentPageAC> |
    ReturnType<typeof setTotalCountAC> |
    ReturnType<typeof toggleIsFetchingAC> |
    ReturnType<typeof toggleFollowingInProgressAC>