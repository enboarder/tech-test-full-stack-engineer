import { DisplayConsole as StyledComponent } from './styles';
import React from 'react';
import { useSelector } from "react-redux";
import DisplayConsoleItem from './DisplayConsoleItem';

const DisplayConsole = () => {
    const { isFetchingInProgress,
        errorMessage,allCapsules,landingPad,isShowAllCapsulesMode } = useSelector(state => state.spaceData);
    return <StyledComponent>
        <>
            {
                isFetchingInProgress ? <h5>Loading...</h5> : null
            }
        </>
        <>
            {
                errorMessage ? <h5>{errorMessage}</h5> : null
            }
        </>
        <>
            {   
                (isShowAllCapsulesMode&&allCapsules)?allCapsules.map((capsule)=>(<DisplayConsoleItem key={capsule.capsule_serial} data={capsule}></DisplayConsoleItem>)):null
            }
        </>
        <>
            {   
                (!isShowAllCapsulesMode&&landingPad)?<DisplayConsoleItem data={landingPad}></DisplayConsoleItem>:null
            }
        </>
    </StyledComponent>
}
export default DisplayConsole;