export function userScore (user, questions) {
    let score = 0;
    Object.keys(user).forEach(a => {
        if (user[a] === questions[a].answer) {
            score++;
        }
    });
    return score;
}

export function qScore (users, questions, qId) {
    let score = 0;
    let all = 0;
    Object.keys(users).forEach(u => {
        let usr = users[u];
        if (qId in usr) {
            all++;
            if (usr[qId] === questions[qId].answer) {
                score++;
            }
        }
    });
    return score/all;
}