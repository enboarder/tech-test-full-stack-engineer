import { hot } from 'react-hot-loader/root';
import React from 'react';

import GlobalStyle from '../theme';
import { Application } from './styles';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import Capsules from './capsules';
import MainDisplay from './main-display'
import LandingPads from './landing-pads'

const Interface = () => (
    <>
        <Capsules />
        <Rocket />
        <LandingPads />
    </>
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