import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {ActionTypes, addPostAC, changePostAC, PostsType} from '../../../redux/state';

type addPostType = {
    posts: Array<PostsType>
    newPostText: string
    dispatch: (action: ActionTypes) => void
}

export function MyPosts(props: addPostType) {

    const postsElements = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const newTextChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
       let newText = event.currentTarget.value
        props.dispatch(changePostAC(newText))
    }

    const addPost = () => {
        props.dispatch(addPostAC())
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.newPostText} onChange={newTextChangeHandler}/>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                    <button>Remove</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}