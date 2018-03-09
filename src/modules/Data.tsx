import { h } from "preact";
import Summary from './Summary';
import Table from './Table';
import { body, sitePad, siteCont } from './style';

export default function Data(props) {
    return(
        <div style={body}>
            <Summary qNum={Object.keys(props.questions).length} uNum={Object.keys(props.users).length}/>
            <div style={siteCont}>
                <Table questions={props.questions} users={props.users}/>
                <div style={sitePad}/>
            </div>
        </div>
    );
}