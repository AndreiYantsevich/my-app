import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {RootStateType} from '../../store/store';
import WithAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {ComponentType} from 'react';
import {actions} from '../../store/reducers/dialogs-reducer';

const mapStateToProps = (state: RootStateType) => {
    return {
        dialogs: state.dialogs,
    }
}
export default compose<ComponentType>(
    connect(mapStateToProps, {updateNewMessageText: actions.updateNewMessageText, addMessage: actions.addMessage}),
    WithAuthRedirect
)(Dialogs);