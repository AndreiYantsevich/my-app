import {followAPI} from '../api/api';
import {APIResponseType, ResultCodeStatus, UserType} from '../types/types';
import {InferActionsTypes, ThunkType} from './redux-store';
import {Dispatch} from 'react';
import {updateObjectInArray} from '../utils/helpers/object-helpers';
import {usersAPI} from '../api/usersAPI';


const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

const usersReducer = (state = initialState, action: UsersActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case 'SET_USERS':
            return {...state, users: action.users}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_COUNT':
            return {...state, totalUsersCount: action.totalCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_FOLLOWING_PROGRESS':
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


//Actions
export const actions = {
    followSuccess: (userId: string) =>
        ({type: 'FOLLOW', userId} as const),
    unFollowSuccess: (userId: string) =>
        ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) =>
        ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) =>
        ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalCount: (totalCount: number) =>
        ({type: 'SET_TOTAL_COUNT', totalCount} as const),
    toggleIsFetching: (isFetching: boolean) =>
        ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) =>
        ({type: 'TOGGLE_FOLLOWING_PROGRESS', isFetching, userId} as const),
}

//Thunks
export const requestUsersTC = (page: number, pageSize: number): ThunkType => async dispatch => {
    try {
        // show preloader
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        const response = await usersAPI.getUsers(page, pageSize)
        // hide preloader
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(response.items))
        dispatch(actions.setTotalCount(response.totalCount))
    } catch (error) {
        console.log(error)
    }
}
const _followUnfollowFlow = async (dispatch: Dispatch<UsersActionsType>, userId: string, apiMethod: (userId: string) => Promise<APIResponseType>, actionCreator: (userID: string) => UsersActionsType) => {
    try {
        // disable btn during server response
        dispatch(actions.toggleFollowingInProgress(true, +userId))
        const response = await apiMethod(userId)
        if (response.resultCode === ResultCodeStatus.success) {
            dispatch(actionCreator(userId))
        }
        // activate btn after server response
        dispatch(actions.toggleFollowingInProgress(false, +userId))
    } catch (error) {
        console.log(error)
    }

}
export const followUsersTC = (userId: string): ThunkType => async dispatch => {
    await _followUnfollowFlow(dispatch, userId, followAPI.followUser.bind(followAPI), actions.followSuccess)
}
export const unfollowUsersTC = (userId: string): ThunkType => async dispatch => {
    await _followUnfollowFlow(dispatch, userId, followAPI.unfollowUser.bind(followAPI), actions.unFollowSuccess)
}

export default usersReducer;


//Types
type InitialStateType = typeof initialState;
export type UsersActionsType = InferActionsTypes<typeof actions>