import React from 'react';
import s from './Profile.module.css';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostsType} from '../../redux/state';

type profilePropsType = {
    posts: Array<PostsType>
    addPost: (postMessage: string) => void
}

export function Profile(props: profilePropsType) {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts} addPost={props.addPost}/>
        </div>
    );
}