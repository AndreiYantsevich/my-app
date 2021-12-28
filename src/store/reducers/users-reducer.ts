import {followAPI, usersAPI} from '../../api/api';
import {ThunkAction} from 'redux-thunk';
import {InferActionsTypes, RootStateType} from '../store';
import {UserType} from '../../types/types';
import {ActionCreator, Dispatch} from 'redux';
import {updateObjectInArray} from '../../utils/object-helpers';

export enum UsersEnum {
    FOLLOW = 'users/FOLLOW',
    UNFOLLOW = 'users/UNFOLLOW',
    SET_USERS = 'users/SET_USERS',
    SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE',
    SET_USERS_TOTAL_COUNT = 'users/SET_USERS_TOTAL_COUNT',
    TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
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
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        case UsersEnum.UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
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
export const requestUsers = (page: number, pageSize: number): UsersThunk => async dispatch => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    let response = await usersAPI.getUsers(page, pageSize)

    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(response.data.items));
    dispatch(actions.setUsersTotalCount(response.data.totalCount));
};

const followUnfollowFlow = async (dispatch: Dispatch, userID: number, apiMethod: Function, actionCreator: ActionCreator<ActionsType>) => {
    dispatch(actions.toggleFollowingProgress(true, userID));
    let response = await apiMethod(userID)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID));
    }
    dispatch(actions.toggleFollowingProgress(false, userID));
}

export const follow = (userID: number): UsersThunk => async dispatch => {
    await followUnfollowFlow(dispatch, userID, followAPI.followUsers.bind(userID), actions.followSuccess);
};

export const unfollow = (userID: number): UsersThunk => async dispatch => {
    await followUnfollowFlow(dispatch, userID, followAPI.unfollowUsers.bind(userID), actions.unfollowSuccess);
};

export type InitialStateType = typeof initialState;
export type ActionsType = InferActionsTypes<typeof actions>
type UsersThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType>