import React from 'react';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {RootStateType} from '../../../store/store';
import {addPost, updateNewPostText} from '../../../store/reducers/profile-reducer';


const mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profile.posts,
        newPostText: state.profile.newPostText
    }
}

export default connect(mapStateToProps, {
    updateNewPostText,
    addPost,
})(MyPosts)