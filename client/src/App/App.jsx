import { hot } from 'react-hot-loader/root';
import React from 'react';
import styled from 'styled-components';

import GlobalStyle from '../theme';
import { Application } from './styles';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import Capsules from './capsules';
import MainDisplay from './main-display'
import LandingPads from './landing-pads'

const Interface = () => {
    const Wrapper = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 5px;
        align-items: center;
        @media (min-width: 800px) {
            flex-direction: row
        }
        @media (max-width: 800px) {
            flex-direction: column
        }
    `

    return (
        <Wrapper>
            <Capsules />
            <Rocket />
            <LandingPads />
        </ Wrapper>
    )

}


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