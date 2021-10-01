const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

type UsersStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

type ActionFollowType = {
    type: typeof FOLLOW
    userID: number
}

type ActionUnfollowType = {
    type: typeof UNFOLLOW
    userID: number
}

type ActionSetUsersType = {
    type: typeof SET_USERS
    users: UserType[]
}

type ActionSetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

type ActionSetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}

type ActionToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

type ActionsUsersType =
    ActionFollowType
    | ActionUnfollowType
    | ActionSetUsersType
    | ActionSetCurrentPageType
    | ActionSetTotalUsersCountType
    | ActionToggleIsFetchingType

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

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
}

export const usersReducer = (state: UsersStateType = initialState, action: ActionsUsersType): UsersStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users
                    .map(u => (u.id === action.userID)
                        ? {...u, followed: true}
                        : u
                    )
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users
                    .map(u => (u.id === action.userID)
                        ? {...u, followed: false}
                        : u
                    )
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const followAC = (userID: number): ActionFollowType => ({type: FOLLOW, userID} as const)
export const unfollowAC = (userID: number): ActionUnfollowType => ({type: UNFOLLOW, userID} as const)
export const setUsersAC = (users: UserType[]): ActionSetUsersType => ({type: SET_USERS, users} as const)
export const setCurrentPageAC = (currentPage: number): ActionSetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage
} as const)
export const setUsersTotalCountAC = (totalUsersCount: number): ActionSetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
} as const)
export const toggleIsFetchingAC = (isFetching: boolean): ActionToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching} as const)


