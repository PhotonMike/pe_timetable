import * as React from 'react';
import Data from './modules/Data';
import * as firebase from "firebase";

interface dataProps {
    fireBase: firebase.app.App;
    global: object;
}

export default function App(props: dataProps) {
    return(
        <Data fireBase={props.fireBase} global={props.global}/>
    );
}
