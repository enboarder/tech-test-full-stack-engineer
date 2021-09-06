import React, { useContext } from 'react';
import { LaunchPadContext } from '../Context/LaunchPadContext';

const DisplayConsole = () => 
{
    const [state] = useContext(LaunchPadContext);

    return (
        <ul>
            { 
                state.isCapsules && state.capsules
                    .sort((a, b) => a.original_launch > b.original_launch ? 1 : -1)
                    .map(e => (
                        <li key={`${e.capsule_serial}_${e.capsule_id}`}>
                            {e.capsule_serial}<br />
                            {e.details}<br />
                            {e.original_launch}<br />
                            {e.status}
                        </li>
                    ))
            }
            { 
                state.isLandingPad && state.landingPad
                && <li>{state.landingPad.id}<br />{state.landingPad.details}<br />{state.landingPad.status}</li>
            }
            { 
                state.isLandingPad && !state.landingPad
                && <li>The ID is invalid. Please search again.</li>
            }
        </ul>
    )
};

export default DisplayConsole;