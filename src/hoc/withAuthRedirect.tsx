import React, {ComponentType, FC} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {RootStateType} from '../store/store';

type MapStatePropsType = {
    isAuth: boolean;
}
type MapDispatchPropsType = {}

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth
} as MapStatePropsType);

function WithAuthRedirect<T>(Component: ComponentType<T>) {
    const RedirectComponent: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as T}/>;
    }
    return connect(mapStateToProps)(RedirectComponent);
}

export default WithAuthRedirect;