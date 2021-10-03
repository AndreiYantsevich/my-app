import {ProfileActionCreators} from './profile-action-creators';
import {PostType} from '../../../components/Profile/MyPosts/Post/Post';

export interface ProfileType {
    aboutMe: string | null;
    contacts: {
        facebook: string | null;
        website: string | null;
        vk: string | null;
        twitter: string | null;
        instagram: string | null;
        youtube: string | null;
        github: string | null;
        mainLink: string | null;
    },
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    fullName: string;
    userId: number;
    photos: {
        small: string;
        large: string;
    }
}

export type ProfilePagePropsType = {
    posts: Array<PostType>;
    newPostText: string;
    profile: null | ProfileType;
}

export enum ProfileActionEnum {
    ADD_POST = 'ADD_POST',
    UPDATE_NEW_POST_TEXT = 'CHANGE_POST_TEXT',
    SET_USER_PROFILE = 'SET_USER_PROFILE'
}

export type ProfileAction = (
    ReturnType<typeof ProfileActionCreators.addPost> |
    ReturnType<typeof ProfileActionCreators.updateNewPostText> |
    ReturnType<typeof ProfileActionCreators.setUserProfile>
)