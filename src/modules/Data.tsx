import * as React from 'react';
import Summary from './Summary';
import { body, sitePad, siteCont } from './style';
import * as firebase from "firebase";
import * as Database from "../Database";

interface dataProps {
    fireBase: firebase.app.App;
    global: object;
}

export default function Data(props: dataProps) {
    return(
        <div style={body}>
            <div style={siteCont}>
                <Summary fB={props.fireBase} global={props.global}/>
                {/*<div style={sitePad}/>*/}
            </div>
        </div>
    );
}