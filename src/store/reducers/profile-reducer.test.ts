import profileReducer, {actions} from './profile-reducer';
import {PostType, ProfileType} from '../../types/types';

const state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 25},
        {id: 2, message: 'This is my first project', likesCount: 49}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

it('new post should be added', () => {
    const action = actions.addPost('it-kamasutra.com');

    const newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3);
    expect(newState.posts[2].message).toBe('it-kamasutra.com');

});

it('after deleting length of messages  should be decrement', () => {
    const action = actions.deletePost(1);

    const newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1);

})
