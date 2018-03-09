import { h } from 'preact';
import { good, bad, padding, tableText, th } from './style';
import { userScore, qScore } from './common';

export default function Table(props) {

    let footers = [];
    footers[0] = (
        <td class="mdl-data-table__cell--non-numeric">Helyes válaszok</td>
    );

    let uScores = [];
    let avgScore = 0;

    let headers = [];
    headers[0] = (
        <th class="mdl-data-table__cell--non-numeric mdl-data-table__header--sorted-ascending">Felhasználó</th>
    );
    Object.keys(props.questions).forEach(key => {
        let q = props.questions[key];
        headers[key] = (
            <th class="mdl-data-table__cell--non-numeric" style={th}><div style={tableText}>{q.question}</div></th>
        );
        footers[key] = (
            <td class="mdl-data-table__cell--non-numeric">{(Math.round(qScore(props.users, props.questions, key)*10000)/100) + "%"}</td>
        );
    });
    headers.push(<th style={th}><div style={tableText}>Helyesen megválaszolt kérdések</div></th>);

    let rows = [];
    Object.keys(props.users).forEach(key => {
        let usr = props.users[key];
        let row = [];
        row[0] = (
            <td class="mdl-data-table__cell--non-numeric">{key}</td>
        );
        for (let i = 1; i <= Object.keys(props.questions).length; i++) {
            let ques = props.questions[i];
            if (i in usr) {
                let q = usr[i];
                if (q === ques.answer){
                    row[i] = (
                        <td class="mdl-data-table__cell--non-numeric"><p style={good}>{ques.answers[q]}</p></td>
                    );
                }
                else {
                    row[i] = (<td class="mdl-data-table__cell--non-numeric"><p style={bad}>{ques.answers[q]}</p></td>);
                }
            }
            else {
                row[i] = (
                    <td class="mdl-data-table__cell--non-numeric"/>
                );
            }
            let uScore = userScore(usr, props.questions);
            row.push(
                <td>{uScore}</td>
            );
            uScores.push(uScore);
        }
        rows.push(
            <tr>{row}</tr>
        );
    });

    let allScore = 0;
    uScores.forEach(s => {
        allScore += s;
    });
    avgScore = allScore / uScores.length;
    footers.push(
        <td>{Math.round(avgScore*100)/100}</td>
    );

    return(
        <div style={padding}>
            <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                    <tr>{headers}</tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                <thead>
                    <tr>{footers}</tr>
                </thead>
            </table>
        </div>
    );
}