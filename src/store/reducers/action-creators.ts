import {DialogsActionCreators} from './dialogs/dialogs-action-creators';
import {ProfileActionCreators} from './profile/profile-action-creators';


export const allActionCreators = {
    ...DialogsActionCreators,
    ...ProfileActionCreators,
    // ...UsersActionCreators
}