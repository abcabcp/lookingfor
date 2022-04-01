import React from "react";
import ReactDOM from "react-dom";
import App from "App";

import { HashRouter } from "react-router-dom";

/** 리덕스 구성을 위한 참조 */
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
