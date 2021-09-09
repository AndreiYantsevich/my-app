const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';


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

type ActionsUsersType =
    ActionFollowType
    | ActionUnfollowType
    | ActionSetUsersType

type LocationType = {
    city: string
    country: string
}

export type UserType = {
    id: number
    photos: {
        small: string
        large: string
    }
    name: string
    status: string
    followed: boolean
    location: LocationType
}

const initialState = {
    users: [] as UserType[]
}

export type UsersPageType = typeof initialState

export const usersReducer = (state: UsersPageType = initialState, action: ActionsUsersType): UsersPageType => {

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
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}

export const followAC = (userID: number): ActionFollowType => ({type: FOLLOW, userID})
export const unfollowAC = (userID: number): ActionUnfollowType => ({type: UNFOLLOW, userID})
export const setUsersAC = (users: UserType[]): ActionSetUsersType => ({type: SET_USERS, users})


