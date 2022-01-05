import React, {Suspense} from 'react';
import styles from './App.module.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import News from '../News/News';
import Music from '../Music/Music';
import Friends from '../Friends/Friends';
import Login from '../Login/Login';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeAppTC} from '../../redux/appReducer';
import {AppRootStateType} from '../../redux/redux-store';
import Preloader from '../common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('../Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('../Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('../Users/UsersContainer'));


class App extends React.Component<OwnPropsType> {

    // catch all server errors
    catchAllUnhandledErrors = function (promiseRejectionEvent: Event) {
        console.log('Some error occured')
        console.log(promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeApp()
        window.addEventListener('unhandlesrejection', this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener('unhandlesrejection', this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={styles.app}>
                <main className={styles.main}>
                    <div className={styles.sidebar}>
                        <Sidebar/>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.contentMain}>
                            <Switch>
                                <Redirect exact from="/" to="/profile"/>
                                <Route path="/login" render={() => <Login/>}/>
                                <Route path="/profile/:userId?"
                                       render={() => <Suspense fallback={
                                           <Preloader/>}><ProfileContainer/></Suspense>}/>
                                <Route path="/dialogs"
                                       render={() => <Suspense fallback={
                                           <Preloader/>}><DialogsContainer/></Suspense>}/>
                                <Route path="/users"
                                       render={() => <Suspense fallback={
                                           <Preloader/>}><UsersContainer/></Suspense>}/>
                                <Route path="/news" render={() => <News/>}/>
                                <Route path="/music" render={() => <Music/>}/>
                                <Route path="/friends" render={() => <Friends/>}/>
                                <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </div>
                        <div className={styles.footer}>
                            <Footer/>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const MapStateToProps = (state: AppRootStateType): MSTPType => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect<MSTPType, MDTPType, null, AppRootStateType>(MapStateToProps, {initializeApp: initializeAppTC}))(App)


// TYPES
type MDTPType = {
    initializeApp: () => void
}

type MSTPType = {
    initialized: boolean
}

type AppPropsType = MDTPType & MSTPType

type PathParamsType = {}

type OwnPropsType = RouteComponentProps<PathParamsType> & AppPropsType
