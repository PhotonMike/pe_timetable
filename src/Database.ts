import fetch from 'isomorphic-fetch';

let url = "https://egeszsegquiz.firebaseapp.com/";
//let url = "http://localhost:5000/";

export function getUsers() {
    return fetch(url+"users.json").then(res => res.json());
}

export function getQuestions() {
    return fetch(url+"questions.json").then(res => res.json());
}