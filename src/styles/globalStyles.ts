import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStlyes = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif !important;
        box-sizing:border-box;
    }

    body, input, button {
        font-size: 14px;
        line-height: 18px;
    }
    
    body,input {
        color: #262626;
        background-color: ${(props) => props.theme.color.bg_gray};
    }

    input {
        border: 1px solid ${(props) => props.theme.color.bd_gray}
    }
    
    input:focus {
        outline:none;
    }
    button {
        border:none;
        background-color:inherit;
        cursor:pointer;
        font-weight: ${(props) => props.theme.font.bold}
    }
    `;

export default GlobalStlyes;
