import styled from 'styled-components';
import { device } from './Styles/devices';

const Application = styled.div`
    font-family: Roboto;
    font-weight: 300;
    font-size: 25px;
    font-style: italic;
    color: white;
    width: 100vw;
    height: 100vh;
    display: flex;
    svg, span {
        padding-left: 10px;
    }

    @media ${device.laptop} {
        width: 50vw;
        height: 50vh;
        flex-direction: column;
    }
`;

const Main = styled.main`
    background: black;
    flex-basis: 66%;
    overflow-wrap: break-word;
    overflow-y:scroll;
    padding: 20px;
`;

const Aside = styled.aside`
    flex-basis: 33%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    padding: 20px;

    @media ${device.laptop} {
        flex-direction: row;
        justify-content: space-between;
    }
`;

export {
    Application,
    Main,
    Aside
};