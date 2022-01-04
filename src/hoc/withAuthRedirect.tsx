import React from 'react';
import {Redirect} from 'react-router-dom';
import {AppRootStateType} from '../redux/redux-store';
import {connect} from 'react-redux';

type MapStateType = {
    isAuth: boolean
}

const MapStateToPropsWithRedirect = (state: AppRootStateType): MapStateType => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = <P extends object>(Component: React.ComponentType<P>) => {
    class RedirectComponent extends React.Component<MapStateType> {
        render() {
            return !this.props.isAuth
                ? <Redirect to={'/login'}/>
                : <Component {...this.props as P} />
        }
    }
    return connect<MapStateType, null, P, AppRootStateType>(MapStateToPropsWithRedirect)(RedirectComponent)
}