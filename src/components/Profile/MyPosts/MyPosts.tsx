import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

export function MyPosts() {
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                <button>Add post</button>
                <button>Remove</button>
                </div>
            </div>
            <div className={s.posts}>
                <Post message={'Hi, how are you?'} likesCount={25}/>
                <Post message={'This is my first project'} likesCount={49}/>
            </div>
        </div>
    );
}