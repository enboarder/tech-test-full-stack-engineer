import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #003366;
        padding: 0;
        margin: 0;
    }

    button {
        padding: 10px;
        margin: 2px;
        border-radius: 5px;
        border: 1px solid black;
        font-weight: 800;
        @media (max-width: 800px) {
            width: 100%;
        }
    }

    input {
        margin: 5px;
    }
`;

export default GlobalStyle;
