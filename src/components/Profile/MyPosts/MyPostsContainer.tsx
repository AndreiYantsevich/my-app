import {actions} from '../../../redux/profileReducer';
import MyPosts, {PostType} from './MyPosts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/redux-store';
import {MapDispatchToPropsPostsType} from '../../../types/types';

type MapStateToPropsType = {
    posts: PostType[]
}

type MapDispatchToPropsType = {
    addPost: (newPostBody: string) => void
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}

let mapDispatchToProps = (dispatch: MapDispatchToPropsPostsType): MapDispatchToPropsType => {
    return {
        addPost: (newPostBody: string) => {
            dispatch(actions.addPost(newPostBody))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);