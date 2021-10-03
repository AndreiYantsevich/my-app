import {DialogsActionCreators} from './dialogs/dialogs-action-creators';
import {ProfileActionCreators} from './profile/profile-action-creators';
import {UsersActionCreators} from './users/users-action-creators';

export const allActionCreators = {
    ...DialogsActionCreators,
    ...ProfileActionCreators,
    ...UsersActionCreators
}