import { h } from 'preact';
import Data from './modules/Data';

export default function App(props) {
    return(
        <Data questions={props.questions} users={props.users}/>
    );
}
