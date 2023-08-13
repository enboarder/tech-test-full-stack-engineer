import React from 'react';
import GlobalStyle from '../theme';
import { Application } from './styles';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import SearchPage from './searchPage';

const App = () => (
    <>
        <Application >
            <section>
            < SearchPage />
            </section>
        </Application>
        <GlobalStyle />
    </>
);

export default App;