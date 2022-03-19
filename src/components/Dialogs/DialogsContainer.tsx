import React from 'react';
import {actions} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {DialogItemType} from './DialogItem/DialogItem';
import {MessageType} from './Message/Message';

let mapStateToProps = (state: AppRootStateType) => {
    return {
        dialogs: state.messagesPage.dialogs,
        messages: state.messagesPage.messages
    }
}

export default compose<React.ComponentType>(
    connect<MapStateType, MapDispatchToPropsType, null, AppRootStateType>(
        mapStateToProps,
        {
            sendMessage: actions.addMessage
        }),
    withAuthRedirect
)(Dialogs)


// Types
type MapStateType = {
    dialogs: Array<DialogItemType>
    messages: Array<MessageType>
}

type MapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}