import {ProfileActionEnum, ProfileType} from './profile-types';


export const ProfileActionCreators = {
    addPost: () => ({type: ProfileActionEnum.ADD_POST} as const),
    updateNewPostText: (payload: string) => ({type: ProfileActionEnum.UPDATE_NEW_POST_TEXT, payload} as const),
    setUserProfile: (profile: ProfileType) => ({type: ProfileActionEnum.SET_USER_PROFILE, profile} as const),
}