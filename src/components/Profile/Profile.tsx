import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../store/reducers/profile-reducer';

export type ProfilePropsType = {
    profile: ProfileType | null
}

const Profile: React.FC<ProfilePropsType> = React.memo((props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    );
});

export default Profile;