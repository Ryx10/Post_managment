import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from 'react-redux';
import store from './store/store';


import "./styles/app.scss";
import "./styles/vendor/bootstrap/css/bootstrap.css";
import "./styles/vendor/bootstrap/css/bootstrap-theme.css";

ReactDOM.render(
    <Provider store={store()}>
            <App />
    </Provider>, document.getElementById("app"));
