import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostsType} from '../../../redux/store';

type myPostsPropsType = {
    posts: Array<PostsType>
    newPostText: string
    changePostText: (newText: string) => void
    addPost: () => void
}

export function MyPosts(props: myPostsPropsType) {

    const postsElements = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const onPostChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
       let newText = event.currentTarget.value
        props.changePostText(newText)
    }

    const onAddPostHandler = () => {
        props.addPost()
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.newPostText} onChange={onPostChangeHandler}/>
                </div>
                <div>
                    <button onClick={onAddPostHandler}>Add post</button>
                    <button>Remove</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}