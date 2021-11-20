import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {RootStateType} from '../../../store/store';
import {
    actions
} from '../../../store/reducers/profile-reducer';


const mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profile.posts,
        newPostText: state.profile.newPostText
    }
}

export default connect(mapStateToProps, {
    updateNewPostText: actions.updateNewPostText,
    addPost: actions.addPost,
})(MyPosts)