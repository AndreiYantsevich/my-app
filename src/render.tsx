import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {addPost, addMessage, RootStateType, changePostText, changeMessageText} from './redux/state';
import {BrowserRouter} from 'react-router-dom';

export let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                addPost={addPost}
                addMessage={addMessage}
                changePostText={changePostText}
                changeMessageText={changeMessageText}/>
        </BrowserRouter>, document.getElementById('root'));
}