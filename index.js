// D O  T H E M  V A R S
// ik let is better but I DONT CARE HAHAHAHA
// also i am aware at how bad i am at naming vars
var correct = 0;
var questionNum = 0;
var lastQ;
const qp = document.getElementsByTagName("h1")[0];
const inp = document.getElementsByTagName("input")[0];
const sDisplay = document.getElementById("score");
const tDisplay = document.getElementById("timer");
const c = document.getElementById("c");
const f = document.getElementById("f");
const ss = document.getElementById("s");
const fs = document.getElementById("fs");
var s = 60;

//generate random operation 
function gen() {
    var question;
    var answer;
    var numbers = [];
    for (i = 0; i < 19; i++) {
        numbers.push(i);
    }
    //random ints and choose operator
    var operators = ["a", "s", "m", "d"];
    var x = numbers[Math.floor(Math.random() * numbers.length)];
    var y = numbers[Math.floor(Math.random() * numbers.length)];
    var op = operators[Math.floor(Math.random() * operators.length)];
    //assign the question with the answer
    if (op == "a") {
        question = `${x} + ${y}`;
        answer = x + y;
    } else if (op == "s") {
        question = `${x} - ${y}`;
        answer = x - y;
    } else if (op == "m") {
        question = `${x} x ${y}`;
        answer = x * y;
    } else if (op == "d" && y != 0 && Number.isInteger(x / y)) {
        question = `${x} / ${y}`;
        answer = x / y;
    }
    return [question, answer];
}

//post question
function post() {
    inp.value = "";
    var q = gen();
    if (q[0] === undefined || q[0] == lastQ) { post(); return }
    qp.innerText = q[0];
    //onsubmit check correct-ness
    document.getElementById('i').onsubmit = function() {
        if (inp.value == q[1]) {
            correct++;
            questionNum++;
        } else {
            questionNum++;
        }
        lastQ = q[0];
        sDisplay.innerText = `${correct}/${questionNum}`;
        post();
        return false;
    };
}

//show the end screen
function end() {
    c.style.display = "none";
    f.style.display = "block";
    fs.innerText = `Total Score: ${correct}/${questionNum}`;
}

//timer logic
function timer() {
    s--;
    tDisplay.innerText = s;
    if (s < 0) {
        end();
    }
}

//start the thing
function start() {
    c.style.display = "block";
    ss.style.display = "none";
    post();
    setInterval(timer, 1000);
}