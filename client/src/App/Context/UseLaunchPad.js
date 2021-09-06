import { LaunchPadContext } from './LaunchPadContext';
import { useCallback, useContext } from 'react';

const useLaunchPad = () => {
    const [state, setState] = useContext(LaunchPadContext);

    const getCapsules = useCallback(() => {
        fetch("https://api.spacexdata.com/v3/capsules")
            .then(res => res.json())
            .then(
                result => {
                    setState({
                        ...state,
                        capsules: result,
                        isCapsules: true,
                        isLandingPad: false
                    });
                },
                error => {
                    setState({
                        ...state,
                        isCapsules: true,
                        isLandingPad: false,
                        error
                    });
                }
            )
    },[state, setState]);

    const getLandingPad = id => {
        fetch("https://api.spacexdata.com/v3/launchpads")
            .then(res => res.json())
            .then(
                result => {
                    // const landingPad = result.find(e => e.id === id);
                    const landingPad = result.reduce(( obj,item ) => {
                        obj[item['id']] = item;
                        return obj
                    }, {})[id];

                    setState({
                        ...state,
                        landingPad: landingPad,
                        isCapsules: false,
                        isLandingPad: true,
                    });
                },
                error => {
                    setState({
                        ...state,
                        isCapsules: false,
                        isLandingPad: true,
                        error
                    });
                }
            )
    };

    const setInputValue = e => {
        const inputValue = e.target.value;
        setState({...state, inputValue});
    }

    return {
        getCapsules,
        getLandingPad,
        setInputValue
    }
};

export default useLaunchPad;