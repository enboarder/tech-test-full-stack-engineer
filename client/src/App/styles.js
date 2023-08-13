import styled from 'styled-components';

const Application = styled.div`
    font-family: Roboto;
    font-weight: 300;
    font-size: 25px;
    font-style: italic;
    color: black;
    top: 5%;
    position: absolute;
    padding: 10px;
    svg, span {
        padding-left: 10px;
    }
`;

const Label = styled.label`
    width: 130px;
`

const Table = styled.table`
    border: 1px solid black;
    border-collapse: collapse;
`

const Th = styled.th`
    border: 1px solid black;
    border-collapse: collapse;
    width: 300px
`

const Td = styled.td`
    border: 1px solid black;
    border-collapse: collapse;
    text-align: center;
`

const Tr = styled.tr`
    border: 1px solid black;
    border-collapse: collapse;
`


export {
    Application,
    Label,
    Table,
    Th,
    Td
};