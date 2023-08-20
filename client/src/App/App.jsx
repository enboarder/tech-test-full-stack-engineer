import React from 'react';
import GlobalStyle from '../theme';
import { Application } from './styles';
import { ReactComponent as Rocket } from '../assets/rocket.svg';

const App = () => (
    <>
        <Application >
            <Rocket />
            <span>"Space isn't remote at all. It's only an hour's drive away, if your car could go straight upwards."</span>
        </Application>
        <GlobalStyle />
    </>
);

export default App;
