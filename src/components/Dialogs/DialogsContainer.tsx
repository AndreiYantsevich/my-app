import React from 'react';
import {addMessageAC, changeMessageAC} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {StateType} from '../../redux/store';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: StateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeMessage: (newText: string) => {
            dispatch(changeMessageAC(newText))
        },
        sendMessage: () => {
            dispatch(addMessageAC())
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs)