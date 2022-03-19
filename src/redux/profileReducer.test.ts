import {v1} from 'uuid';
import profileReducer, {actions} from './profileReducer';
import {ProfilePageType} from '../types/types';


let startState: ProfilePageType;

beforeEach(() => {
    startState = {
        posts: [
            {id: v1(), message: 'Hi World! How are you?', likesCounter: 75},
            {id: v1(), message: 'Today is a good day!', likesCounter: 57},
        ],
        status: 'status',
        profile: {
            userId: 1,
            lookingForAJob: true,
            lookingForAJobDescription: 'React Developer',
            fullName: 'User Name',
            aboutMe: ':)',
            contacts: {
                github: 'github.com',
                vk: 'vk.ru',
                facebook: 'fb.com',
                instagram: 'instagram.com/www',
                twitter: 'twitter.com',
                website: 'wwww.com',
                youtube: 'youtube.com',
                mainLink: 'mainlink.com'
            },
            photos: {
                small: null,
                large: 'large.jpg'
            }
        }
    }
})

test('Post should be added', () => {
    const action = actions.addPost('newPostBody')
    const endState = profileReducer(startState, action)

    expect(endState['posts'].length).toBe(3)
})