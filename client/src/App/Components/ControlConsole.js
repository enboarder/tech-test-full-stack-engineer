import React, { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as Rocket } from '../../assets/rocket.svg';
import Button from './button.js';
import useLaunchPad from '../Context/UseLaunchPad';
import { LaunchPadContext } from '../Context/LaunchPadContext';

const StyledInput = styled.input`
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
`;

const ControlConsole = () => 
{
    const [ state ] = useContext(LaunchPadContext)
    const { getCapsules, getLandingPad, setInputValue } = useLaunchPad();

    return (
        <>
            <Button
                type="submit"
                value="Submit"
                onClick={getCapsules}
            >
                Capsules
            </Button>
            <Rocket />
            <StyledInput
                type="text"
                maxLength="15"
                value={state.inputValue}
                onChange={setInputValue}
            />
            <Button
                type="submit"
                value="Submit"
                onClick={() => getLandingPad(state.inputValue)}
            >
                Landing Pad
            </Button>
        </>
    )
};

export default ControlConsole;