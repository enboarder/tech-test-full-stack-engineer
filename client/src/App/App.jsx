import { hot } from 'react-hot-loader/root';
import React from 'react';
import GlobalStyle from '../theme';
import { Application, Main, Aside } from './styles';
import DisplayConsole from './Components/DisplayConsole';
import { LaunchPadContextProvider } from './Context/LaunchPadContext';
import ControlConsole from './Components/ControlConsole';

const App = () => {
    return (
        <LaunchPadContextProvider>
            <Application >
                <Main>
                    <DisplayConsole />
                </Main>
                <Aside>
                    <ControlConsole />
                </Aside>
            </Application>
            <GlobalStyle />
        </LaunchPadContextProvider>
    );

}

export default hot(App);