import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "assets/scss/font.module.scss";

const GlobalStyles = createGlobalStyle` 

    ${reset}

    a{
        text-decoration: none;
        color: inherit;
    }

    *{
        box-sizing: border-box;
    }

    body {
        font-family: "Pretendard-Light";
        font-size: 15px;
        line-height: 20px;
        color: var(--black);
        padding: 0;
        margin: 0;
        width: 100%;
        border-top: 3px solid #1c1c1c;
    }

    button:hover {
        cursor: pointer;
    }

`;

export default GlobalStyles;
