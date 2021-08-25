import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {StoreType} from './redux/state';

type appPropsType = {
    store: StoreType
}

export function App(props: appPropsType) {

    const state = props.store.getState()

    const dialogs = state.dialogsPage.dialogs;
    const messages = state.dialogsPage.messages;
    const posts = state.profilePage.posts;
    const newPostText = state.profilePage.newPostText;
    const newMessageText = state.dialogsPage.newMessageText;

    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Route path={'/dialogs'} render={() => <Dialogs
                    dialogs={dialogs}
                    messages={messages}
                    newMessageText={newMessageText}
                    dispatch={props.store.dispatch.bind(props.store)}
                />}/>
                <Route path={'/profile'} render={() => <Profile
                    posts={posts}
                    newPostText={newPostText}
                    dispatch={props.store.dispatch.bind(props.store)}
                />}/>
                <Route path={'/news'} component={News}/>
                <Route path={'/music'} component={Music}/>
                <Route path={'/settings'} component={Settings}/>
            </div>
        </div>
    );
}
