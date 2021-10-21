import React from 'react';
import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {RootStateType} from '../../../store/store';
import { ProfileActionCreators } from '../../../store/reducers/profile-reducer';


const mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profile.posts,
        newPostText: state.profile.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewPostText: (payload: string) => {
            dispatch(ProfileActionCreators.updateNewPostText(payload))
        },
        addPost: () => {
            dispatch(ProfileActionCreators.addPost())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)