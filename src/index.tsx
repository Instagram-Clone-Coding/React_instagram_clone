import App from "App";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import GlobalStlyes from "styles/globalStyles";
import theme from "styles/theme";

import { Provider } from "react-redux";
import { store } from "app/store/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStlyes />
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);
