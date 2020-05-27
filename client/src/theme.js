import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #003366;
    padding: 0;
    margin: 0;
  }

  div {
    .outer-border {
      border: 1px solid black;
      padding: 5px;
      margin: 5px;
    }
  }
`;

export default GlobalStyle;
