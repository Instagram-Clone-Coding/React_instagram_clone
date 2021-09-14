import App from "App";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import GlobalStlyes from "styles/globalStyles";
import theme from "styles/theme";

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStlyes />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
