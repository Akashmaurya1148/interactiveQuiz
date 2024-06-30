const quizObject = [
    {
        question:"What is the primary aim of youth welfare programs?",
        a:"Financial support",
        b:"Holistic development",
        c:"Entertainment",
        d:"None of the above",
        ans:"ans2"
    },
    {
        question:"Which international organization focuses on the welfare of children and youth?",
        a:"WHO",
        b:"IMF",
        c:"UNICEF",
        d:"UNESCO",
        ans:"ans3"
    },
    {
        question:"What percentage of youth globally are estimated to experience mental health issues by the age of 14?",
        a:"10%",
        b:"20%",
        c:"30%",
        d:"40%",
        ans:"ans2"
    },
    {
        question:"What is a common form of therapy used to treat youth with mental health issues?",
        a:"Cognitive Behavioral Therapy (CBT)",
        b:"Hypnotherapy",
        c:"Herbal medicine",
        d:"Acupuncture",
        ans:"ans1"
    },
    {
        question:"Which organization provides guidelines and support for youth mental health?",
        a:"WHO",
        b:"CDC",
        c:"NAMI",
        d:"All of the above",
        ans:"ans4"
    },
    {
        question:"What international document outlines the rights of children?",
        a:"Universal Declaration of Human Rights",
        b:"Convention on the Rights of the Child",
        c:"International Covenant on Civil and Political Rights",
        d:"None of the above",
        ans:"ans2"
    },
    {
        question:"What is an apprenticeship",
        a:"A full-time job",
        b:"On-the-job training program",
        c:"Volunteering opportunity",
        d:"None of the above",
        ans:"ans1"
    },
    {
        question:"Which youth-led movement focuses on climate change?",
        a:"Youth for Environment",
        b:"Fridays for Future",
        c:"Eco Youth Network",
        d:"Green Teens",
        ans:"ans2"
    },
    {
        question:"Which campaign aims to end violence against children and youth?",
        a:"#MeToo",
        b:"#EndViolence",
        c:"#ClimateAction",
        d:"#HeForShe",
        ans:"ans2"
    },
    {
        question:"Which initiative promotes global health awareness among youth",
        a:"Global Health Corps",
        b:"Youth Health Action",
        c:"Health for Youth",
        d:"Young and Healthy",
        ans:"ans1"
    },
    
    
]

const ques = document.querySelector(".question");
const opt1 = document.querySelector("#option1");
const opt2 = document.querySelector("#option2");
const opt3 = document.querySelector("#option3");
const opt4 = document.querySelector("#option4");
const submit = document.querySelector("#submit");
const timer = document.querySelector("#timer");
const startbtn = document.querySelector("#start");
const displayScore = document.querySelector(".displayScore");
const quizData = document.querySelector(".hide");
const answers = document.querySelectorAll('.Answer');  //querySelectorAll used for multipel answer
const quesNumber = document.querySelector(".quesNumber");

//Intial quiz state
let quesCount = 0;
let score = 0;
let time = quizObject.length * 15 ;
let timerId;
let quesAttempted = 0;
let correcAns = 0;
// console.log(quesCount);//

timer.innerHTML = time;
// start quiz and hide intruction page
function quizStart() {
    timerId = setInterval(
        clockTick,1000
    );
    timer.textContent = time;
    let quizScreen =  document.getElementById("start-screen");
    quizScreen.classList.add('hide');
    quizData.classList.remove('hide');
    loadQues();
}

startbtn.onclick = quizStart;

// loading the quiz
const loadQues = () =>{
    const quesList = quizObject[quesCount];
    ques.innerHTML = quesList.question;
    opt1.innerHTML = quesList.a;
    opt2.innerHTML = quesList.b;
    opt3.innerHTML = quesList.c;
    opt4.innerHTML = quesList.d;
}


const getCheckedAnswer = () =>{
    let answer;

    answers.forEach((curAnsEle) => {
        if (curAnsEle.checked){
            answer = curAnsEle.id;
        }
    });
    return answer;
}
// console.log(quesCount);
quesNumber.innerHTML = `1/${quizObject.length}`

const deselectALl = () =>{
    answers.forEach((curAnsEle) => curAnsEle.checked = false);
}


submit.addEventListener('click', () =>{
    const checkedAnswer = getCheckedAnswer();
    if (checkedAnswer === quizObject[quesCount].ans){
        score = score + 4;
        correcAns++;
        quesAttempted++;
    }
    else { 
        let temp = false;
        answers.forEach((tick) => {
            if (tick.checked){
                temp = true;
                quesAttempted++;
            }
        })

        if (temp === true){
            score = score-1
        }else{
            score = score;
        }
    
    }

    // display question no
    function displayQues() {
        quesNumber.innerHTML = ` ${quesCount+2}/${quizObject.length}`
    }
    displayQues();

    quesCount++; // increasing the question count
   

    deselectALl(); // deselect the existing option

    if (quesCount < quizObject.length){
    loadQues(); // calling the function again
    }
    else{
        displayScore.innerHTML = `
        <h3>Score: ${score}/${quizObject.length*4}</h3>
         <div class="sroreCard">
            <table class="scoreInfo">
              
                <tr>
                    <td>Total Question Attempted:</td>
                    <td>${quesAttempted}</td>
                </tr>
                <tr>
                    <td>Total Correct Question:</td>
                    <td>${correcAns}</td>
                </tr>
                <tr>
                    <td>Total Incorrect Question:</td>
                    <td>${quesAttempted-correcAns}</td>
                </tr>
            </table>
            </div>
        <button class="btn" onclick="location.reload()"> Start Again </button>`;

        displayScore.classList.remove('displayScore');
        quizData.classList.add('scoreArea');
        clearInterval(timerId);
    }

    if (quesCount === quizObject.length-1){
        submit.innerHTML = "Submit";
        // submit.classList.toggle('finish');
    }
});


// End quiz if timer reach 0
function clockTick() {
    time--;
    timer.textContent = time;
    if (time === 0){
        quizEnd();
    }
}

// Quiz end function 
function quizEnd(){
    clearInterval(timerId);
    displayScore.innerHTML = `
        <h1 style="text-align:center;color:red;">Timeout<h1>
        <h3>Score: ${score}/${quizObject.length*4}</h3>
         <div class="sroreCard">
            <table class="scoreInfo">
                
                <tr>
                    <td>Total Question Attempted:</td>
                    <td>${quesAttempted}</td>
                </tr>
                <tr>
                    <td>Total Correct Question:</td>
                    <td>${correcAns}</td>
                </tr>
                <tr>
                    <td>Total Incorrect Question:</td>
                    <td>${quesAttempted-correcAns}</td>
                </tr>
            </table>
            </div>
        <button class="btn" onclick="location.reload()"> Start Again </button>`;

        displayScore.classList.remove('displayScore');
        quizData.classList.add('scoreArea');
        clearInterval(timerId);
    }








