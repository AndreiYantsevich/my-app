import {actions} from '../../../redux/profileReducer';
import MyPosts, {PostType} from './MyPosts';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../../redux/redux-store';

export type MapStateToPropsType = {
    posts: PostType[]
}

export type MapDispatchToPropsType = {
    addPost: (newPostBody: string) => void
}

let mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {addPost: actions.addPost})(MyPosts);