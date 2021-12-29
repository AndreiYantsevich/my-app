import React from 'react';
import {SamuraiTSApp} from './App';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SamuraiTSApp/>, div);
    ReactDOM.unmountComponentAtNode(div);
});