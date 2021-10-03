import {ProfileAction, ProfileActionEnum, ProfilePagePropsType} from './profile-types';

const initialState = {
    newPostText: '',
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 25},
        {id: 2, message: 'This is my first project', likesCount: 49}
    ],
    profile: null
}

export default function profileReducer(state: ProfilePagePropsType = initialState, action: ProfileAction): ProfilePagePropsType {

    switch (action.type) {
        case ProfileActionEnum.ADD_POST: {
            const newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            }
        }
        case ProfileActionEnum.UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.payload
            }
        }
        case ProfileActionEnum.SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default: {
            return state
        }
    }

}