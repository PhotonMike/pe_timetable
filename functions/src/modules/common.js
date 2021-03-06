"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userScore(user, questions) {
    var score = 0;
    Object.keys(user).forEach(function (a) {
        if (user[a] === questions[a].answer) {
            score++;
        }
    });
    return score;
}
exports.userScore = userScore;
function qScore(users, questions, qId) {
    var score = 0;
    var all = 0;
    Object.keys(users).forEach(function (u) {
        var usr = users[u];
        if (qId in usr) {
            all++;
            if (usr[qId] === questions[qId].answer) {
                score++;
            }
        }
    });
    return score / all;
}
exports.qScore = qScore;
//# sourceMappingURL=common.js.map