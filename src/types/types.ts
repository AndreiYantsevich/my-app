import {PostType} from '../components/Profile/MyPosts/MyPosts';


export type MapDispatchToPropsPostsType = (
    args: {
        type: string;
        newText?: string;
    }) => void


//ProfileTypes
export const userProfile: ProfileType = {
    userId: 1,
    lookingForAJob: false,
    lookingForAJobDescription: '',
    fullName: '',
    aboutMe: '',
    contacts: {
        github: '',
        vk: '',
        facebook: '',
        instagram: '',
        twitter: '',
        website: '',
        youtube: '',
        mainLink: ''
    },
    photos: {
        small: '',
        large: ''
    }
}

export type ProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: null | string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type PhotosType = {
    small: null | string
    large: null | string
}

export type ContactsType = {
    github: null | string
    vk: null | string
    facebook: null | string
    instagram: null | string
    twitter: null | string
    website: null | string
    youtube: null | string
    mainLink: null | string
}

export type ProfilePageType = {
    posts: Array<PostType>
    profile: ProfileType
    status: string
}

//UsersTypes
export type UsersPageType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
}

export type UserType = {
    name: string
    id: string
    photos: {
        small?: string
        large?: string
    }
    followed: boolean
    status: string
}