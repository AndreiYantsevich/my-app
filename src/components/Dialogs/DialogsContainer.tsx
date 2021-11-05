import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {RootStateType} from '../../store/store';
import {addMessage, updateNewMessageText} from '../../store/reducers/dialogs-reducer';

const mapStateToProps = (state: RootStateType) => {
    return {
        dialogs: state.dialogs,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {updateNewMessageText, addMessage})(Dialogs);