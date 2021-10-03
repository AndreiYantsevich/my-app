import React from 'react';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import {RootState} from '../../store/redux-store';
import {DialogsActionCreators} from '../../store/reducers/dialogs/dialogs-action-creators';

const mapStateToProps = (state: RootState) => {
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

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs)