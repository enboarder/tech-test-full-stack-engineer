import React from 'react';
import { hot } from 'react-hot-loader/root';
import GlobalStyle from '../theme';
import { Application } from './styles';
import DisplayConsole from './DisplayConsole';
import ControlConsole from './ControlConsole';

const App = () => (
    <>
        <Application>
            <DisplayConsole></DisplayConsole>
            <ControlConsole />
        </Application>
        <GlobalStyle />
    </>
);

export default hot(App);