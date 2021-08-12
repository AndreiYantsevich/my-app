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
import {RootStateType} from './redux/state';

type appPropsType = {
    state: RootStateType
    addPost: (postMessage: string) => void
    addMessage: (postMessage: string) => void
    changePostText: (newText: string) => void
    changeMessageText: (newText: string) => void
}

export function App(props: appPropsType) {

    let dialogs = props.state.dialogsPage.dialogs;
    let messages = props.state.dialogsPage.messages;
    let posts = props.state.profilePage.posts;
    let newPostText = props.state.profilePage.newPostText;
    let newMessageText = props.state.dialogsPage.newMessageText

    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar/>
            <div className={'app-wrapper-content'}>
                <Route path={'/dialogs'} render={() => <Dialogs
                    dialogs={dialogs}
                    messages={messages}
                    newMessageText={newMessageText}
                    addMessage={props.addMessage}
                    changeMessageText={props.changeMessageText}
                />}/>
                <Route path={'/profile'} render={() => <Profile
                    posts={posts}
                    newPostText={newPostText}
                    addPost={props.addPost}
                    changePostText={props.changePostText}
                />}/>
                <Route path={'/news'} component={News}/>
                <Route path={'/music'} component={Music}/>
                <Route path={'/settings'} component={Settings}/>
            </div>
        </div>
    );
}
