import MyPosts from './MyPosts';
import {connect} from 'react-redux';
import {RootStateType} from '../../../store/store';
import {
    actions
} from '../../../store/reducers/profile-reducer';


const mapStateToProps = (state: RootStateType) => {
    return {
        posts: state.profile.posts
    }
}

export default connect(mapStateToProps, {
    addPost: actions.addPost,
})(MyPosts)