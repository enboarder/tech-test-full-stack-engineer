import React from 'react';
import GlobalStyle from '../theme';
import { Application } from './styles';
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