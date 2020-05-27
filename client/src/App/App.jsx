import { hot } from 'react-hot-loader/root';
import React from 'react';

import GlobalStyle from '../theme';
import { Application } from './styles';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import Capsules from './capsules';
import MainDisplay from './main-display'


const Interface = () => (
    <>
        <Capsules />
        <Rocket />
        <LandingPads />
    </>
)

const LandingPads = () => (
    <div className="outer-border">
        <p>
            landing pads text input and button goes here
        </p>
    </div>
)

const App = () => (
    <>
        <Application >
            <MainDisplay />
            <Interface />
        </Application>
        <GlobalStyle />
    </>
);

export default hot(App);