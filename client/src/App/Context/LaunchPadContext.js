import React, { createContext, useState } from 'react';

const LaunchPadContext = createContext([{},()=>{}]);

const LaunchPadContextProvider = props => {
    const [state, setState] = useState({
        capsules: [],
        landingPad: {},
        isCapsules: false,
        isLandingPad: false,
        error: false,
        inputValue: ''
    });

    return (
        <LaunchPadContext.Provider value={[state, setState]}>
            {props.children}
        </LaunchPadContext.Provider>
    );
}

export { LaunchPadContext, LaunchPadContextProvider };