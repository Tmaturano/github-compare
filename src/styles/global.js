/* eslint-disable linebreak-style */
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #9B65E6;
    text-rendering: optimizeLegibility !important;
    -webkist-font-smooothing: antialiased !important;
  }
`;

export default GlobalStyle;
