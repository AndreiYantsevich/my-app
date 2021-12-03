import {RootStateType} from '../store';

export const getUsers = (state: RootStateType) => {
    return state.users.users;
}
export const getPageSize = (state: RootStateType) => {
    return state.users.pageSize;
}
export const getTotalUsersCount = (state: RootStateType) => {
    return state.users.totalUsersCount;
}
export const getCurrentPage = (state: RootStateType) => {
    return state.users.currentPage;
}
export const getIsFetching = (state: RootStateType) => {
    return state.users.isFetching;
}
export const getFollowingInProgress = (state: RootStateType) => {
    return state.users.followingInProgress;
}