import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {RootStateType} from '../../store/store';
import {addMessage, updateNewMessageText} from '../../store/reducers/dialogs-reducer';
import WithAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {ComponentType} from 'react';

const mapStateToProps = (state: RootStateType) => {
    return {
        dialogs: state.dialogs,
    }
}
export default compose<ComponentType>(
    connect(mapStateToProps, {updateNewMessageText: updateNewMessageText, addMessage: addMessage}),
    WithAuthRedirect
)(Dialogs);