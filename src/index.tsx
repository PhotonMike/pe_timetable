import * as React from 'react';
import { render, hydrate } from 'react-dom';
import App from './App';
import * as db from './Database';
import * as firebase from 'firebase';
import {getFirebase, getGlobalAnd} from "./Database";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red } from 'material-ui/colors';
import theme from './theme';

declare global {
    interface Window {
        __fb__: firebase.app.App;
        __global__: object;
    }
}

const fB = db.getFirebase();

interface dataProps {
    fireBase: firebase.app.App;
    global: object;
}

class Main extends React.Component<dataProps, any> {
    // Remove the server-side injected CSS.
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return <App {...this.props} />
    }
}

// Create a theme instance.
/*const theme = createMuiTheme({
    palette: {
        primary: green,
        //accent: red,
        type: 'light',
    },
});*/

if (window.__global__) {
    renderApp(fB, window.__global__);
    window.__fb__ = fB;
}
else {
    getGlobalAnd(fB, (global) => {
        renderApp(fB, global);
    });
}


function renderApp(fb, global) {
    //render(
    hydrate(
        <MuiThemeProvider theme={theme}>
            <Main fireBase={fb} global={global} />
        </MuiThemeProvider>,
        //document.querySelector('body'),
        document.querySelector('#root')
    );
}
