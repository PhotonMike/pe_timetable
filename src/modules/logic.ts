let osztalyok = [
    {
        name: "7.A",
        hours: [
            "h2",
            "k3",
            "c2"
        ]
    },
    {
        name: "8.A",
        hours: [
            "h4",
            "k3",
            "p2"
        ]
    },
    {
        name: "9.A",
        hours: [
            "h4",
            "k3",
            "c2"
        ]
    },
    {
        name: "10.A",
        hours: [
            "h2",
            "k6",
            "p2"
        ]
    },
    {
        name: "11.A",
        hours: [
            "h4",
            "k6",
            "c2"
        ]
    }
];

let termek = [
    {
        name: "Kis terem",
        size: 2
    },
    {
        name: "Mozgás háza",
        size: 3
    },
    {
        name: "Lépcső",
        size: 1
    },
];

export function genTimetable() {
    let timetable = {
        h: {},
        k: {},
        s: {},
        c: {},
        p: {}
    };
    Object.keys(osztalyok).forEach(k1 => {
        let cur = osztalyok[k1];
        cur["hours"].forEach(lesson => {
            if (lesson[1] in timetable[lesson[0]]){
                timetable[lesson[0]][lesson[1]].push({name: cur["name"]});
            }
            else {
                timetable[lesson[0]][lesson[1]] = [{name: cur["name"]}];
            }
        });
    });
    return timetable;
}

export function genPossibility(table) {
    let out = table;
    let go = true;
    Object.keys(table).forEach(n => {
        let nap = table[n];
        Object.keys(nap).forEach(o => {
            let ora = nap[o];
            let terem = 0;
            for(let p = 0; p < ora.length; p++) {
                if ("terem" in out[n][o][p]){
                    let thisTerem = out[n][o][p]["terem"];
                    if(terem < thisTerem){
                        terem = thisTerem;
                    }
                }
                else {
                    if(go){
                        out[n][o][p]["terem"] = terem;
                    }
                    go = false;
                    return go;
                }
                terem++;
            }
            return go;
        });
        return go;
    });
    return out;
}

export function populated(table){
    let out = table;
    let go = true;
    Object.keys(table).forEach(n => {
        let nap = table[n];
        Object.keys(nap).forEach(o => {
            let ora = nap[o];
            for(let p = 0; p < ora.length; p++) {
                if (!("terem" in out[n][o][p])){
                    go = false;
                    return go;
                }
            }
            return go;
        });
        return go;
    });
    return go;
}

export function genPossibilities(table) {
    let pos = table;
    while (!populated(pos)){
        pos = genPossibility(pos);
    }
    return pos;
}

/*
let l = require('./logic.js');
console.log(l.genTimetable());
console.log(l.genPossibilities(l.genTimetable()));
 */