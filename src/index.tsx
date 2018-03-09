import { h, render } from 'preact';
import App from './App';
import {getQuestions, getUsers} from './Database';

if (window.__questions__ && window.__users__) {
    renderApp(window.__questions__, window.__users__);
}
else {
    getQuestions().then(questions => {
        getUsers().then(users => {
            renderApp(questions, users);
        });
    });
}

function renderApp(q, u) {
    render(
        <App questions={q} users={u}/>,
        document.querySelector('body'),
        document.querySelector('#root')
    );
}
