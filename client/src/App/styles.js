import styled from 'styled-components';

const Application = styled.div`
    font-family: Roboto;
    color: white;
    display: flex;
    padding: 10px;
    @media (min-width: 800px) {
        position: absolute;
        top: 25%;
        left: 25%;
        flex-direction: column;
        width: 50%;
        height: 50%;
    }
    @media (max-width: 800px) {
        flex-direction: row;
    }
`;

export {
    Application,
};