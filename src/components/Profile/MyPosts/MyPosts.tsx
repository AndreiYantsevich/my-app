import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostsType} from '../../../redux/state';

type addPostType = {
    posts: Array<PostsType>
    addPost: (postMessage: string) => void
}

export function MyPosts(props: addPostType) {

    let postsElements = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostElement: any = React.createRef()

    let addPost = () => {
        let text = newPostElement.current.value
        props.addPost(text)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
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