import React, {FC, memo} from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

export type ProfilePropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    updateUserPhoto: (photo: File) => void
}

const Profile: FC<ProfilePropsType> = memo((props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} updateUserPhoto={props.updateUserPhoto}/>
            <MyPostsContainer/>
        </div>
    );
});

export default Profile;