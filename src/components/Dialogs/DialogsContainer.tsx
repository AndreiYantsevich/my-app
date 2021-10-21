import React from 'react';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import {RootStateType} from '../../store/store';
import { DialogsActionCreators } from '../../store/reducers/dialogs-reducer';

const mapStateToProps = (state: RootStateType) => {
    return {
        dialogs: state.dialogs
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateNewMessageText: (payload: string) => {
            dispatch(DialogsActionCreators.updateNewMessageText(payload))
        },
        addMessage: () => {
            dispatch(DialogsActionCreators.addMessage())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dialogs);