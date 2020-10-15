import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Roboto;
    font-size: 15px;
    background-color: #003366;
    padding: 0;
    margin: 0;
    color: white;
    #cape-canaveral{
      min-width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:center;
    }
    
  }
`;

export default GlobalStyle;
