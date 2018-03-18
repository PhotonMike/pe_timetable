import * as React from 'react';
import { padding } from './style';
import * as firebase from "firebase";
import * as Database from '../Database';
import Data from "./Data";
import Card, { CardContent } from "material-ui/Card";
import Typography from 'material-ui/Typography';

interface summaryProps {
    fB: firebase.app.App,
    global: object
}

export default class Summary extends React.Component<summaryProps, any> {
    constructor(props: summaryProps) {
        super(props);
        this.state = {
            loadTimes: this.props.global["statistics"]["loadTimes"]
        };
    }
    render() {
        return(
            <Card>
                <CardContent>
                    <Typography variant="headline" component="h2">
                        Statisztika
                    </Typography>
                    <Typography component="p">
                        Betöltve ennyiszer: {this.state.loadTimes}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}