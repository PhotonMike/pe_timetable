import * as React from 'react';
import Summary from './Summary';
import { barPad, siteCont } from './style';
import * as firebase from "firebase";
import * as Database from "../Database";
import MyAppBar from './MyAppBar';
import MyDrawer from './MyDrawer';

interface dataProps {
    fireBase: firebase.app.App;
    global: object;
}

export default function Data(props: dataProps) {
    return(
        <div>
            <MyAppBar/>
            <MyDrawer/>
            <main>
                <div style={barPad}/>
                <div style={siteCont}>
                    <Summary fB={props.fireBase} global={props.global}/>
                    {/*<div style={sitePad}/>*/}
                </div>
            </main>
        </div>
    );
}