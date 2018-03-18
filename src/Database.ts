import * as firebase from 'firebase';
import 'firebase/firestore';

export function getFirebase() {
    const config = {
        apiKey: "AIzaSyA15Zh5xBg_rqA40thmaR9uTnTYTP7hhZE",
        authDomain: "tesiorarend.firebaseapp.com",
        databaseURL: "https://tesiorarend.firebaseio.com",
        projectId: "tesiorarend",
        storageBucket: "tesiorarend.appspot.com",
        messagingSenderId: "168977344998"
    };
    if (!firebase.apps.length) {
        return firebase.initializeApp(config);
    }
    else {
        return firebase.app();
    }

}

export function getMetaDb(fB: firebase.app.App) {
    const db = fB.firestore();
    const metaDb = db.collection("metadata");
    return metaDb.get();
}
export function getGlobalAnd(fB: firebase.app.App, fn: Function) {
    let out = {};
    getMetaDb(fB).then((meta) => {
        meta.forEach(doc => {
            out[doc.id] = doc.data();
        });
        fn(out);
    });
}