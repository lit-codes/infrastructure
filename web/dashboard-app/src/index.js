/* IE support */
import 'babel-polyfill';
/* React */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
/* Better CSS suppport for browsers, some good defaults */
import CssBaseline from '@material-ui/core/CssBaseline';
/* Material UI Theme */
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
/* Pages */
import Root from './Root';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#d32f2f',
            light: '#ff6659',
            dark: '#9a0007',
            text: '#ffffff',
        },
        secondary: {
            main: '#ffcdd2',
            light: '#ffffff',
            dark: '#cb9ca1',
            text: '#000000',
        },
        background: {
            default: '#ababab',
        },
    },
    typography: {
        useNextVariants: true,
        fontFamily: '"Helvetica Neue", "Arial", sans-serif'
    }
});

console.error = function(...args) {
    alert(...args);
};
function App(props) {
    return (
        <BrowserRouter>
            <CssBaseline />
            <MuiThemeProvider theme = { theme }>
                <Route exact path='/' component={Root} />
            </MuiThemeProvider>
        </BrowserRouter>
    );
}

ReactDOM.render(<App />, document.querySelector('#app'));
