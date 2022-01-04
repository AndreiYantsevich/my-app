import React from 'react';
import {Route} from 'react-router-dom';
import styles from './Sidebar.module.css';

import profileImg from '../../assets/images/profile.jpg';
import dialogsImg from '../../assets/images/dialogs.jpg';
import usersImg from '../../assets/images/users.jpg';
import newsImg from '../../assets/images/news.jpg';
import musicImg from '../../assets/images/music.jpg';
import friendsImg from '../../assets/images/friends.jpg';

import Banner from './Banner/Banner';
import Nav from './Nav/Nav';
import HeaderContainer from '../Header/HeaderContainer';

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Route path="/profile"
                   render={() => <Banner image={profileImg} title={'Profile'}/>}/>
            <Route path="/dialogs"
                   render={() => <Banner image={dialogsImg} title={'Dialogs'}/>}/>
            <Route path="/users"
                   render={() => <Banner image={usersImg} title={'Users'}/>}/>
            <Route path="/news" render={() => <Banner image={newsImg} title={'News'}/>}/>
            <Route path="/music"
                   render={() => <Banner image={musicImg} title={'Music'}/>}/>
            <Route path="/friends"
                   render={() => <Banner image={friendsImg} title={'Friends'}/>}/>

            <HeaderContainer/>
            <Nav/>
        </div>
    )
}

export default Sidebar;