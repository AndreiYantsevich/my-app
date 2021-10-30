export enum AuthEnum {
    SET_USER_DATA = 'SET_USER_DATA',
    SET_USER_AVATAR = 'SET_USER_AVATAR'
}

type AuthStateType = {
    id: number,
    email: string,
    login: string,
    isAuth: boolean,
    userAvatar: string
}

export type AuthAction =
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof setAuthUserAvatar>



const initialState: AuthStateType = {
    id: 19514,
    email: 'yantsevich92@gmail.com',
    login: 'yantsevich',
    isAuth: true,
    userAvatar: 'default',
}

export default function authReducer(state = initialState, action: AuthAction): AuthStateType {

    switch (action.type) {
        case AuthEnum.SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case AuthEnum.SET_USER_AVATAR:
            return {
                ...state,
                userAvatar: action.avatar
            }
        default:
            return state;
    }
}


export const setAuthUserData = (id: number, email: string, login: string) => ({
    type: AuthEnum.SET_USER_DATA, payload: {id, email, login}} as const);

export const setAuthUserAvatar = (avatar: string) => ({type: AuthEnum.SET_USER_AVATAR, avatar} as const);
