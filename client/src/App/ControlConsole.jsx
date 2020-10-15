import { Button, ControlConsole as StyledConsole, Separator } from './styles';
import React from 'react';
import LandingPad from './LandingPad';
import { ReactComponent as Rocket } from '../assets/rocket.svg';
import { useDispatch } from "react-redux";
import { fetchAllCapsules } from "../redux/spaceData/spaceDataActions";

const ControlConsole = () => {
    const dispatch = useDispatch();
    const onFetchAllClick = (event) => {
       
        dispatch(fetchAllCapsules());
    }
    return <StyledConsole>
        <Button onClick={onFetchAllClick}>Capsules</Button>
        <Separator></Separator>
        <Rocket />
        <Separator></Separator>
        <LandingPad />
    </StyledConsole>;

}
export default ControlConsole;