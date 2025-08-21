import { quiz } from "./questions.js";


const mainPage = document.querySelector('.main-page');
const startNow = document.querySelector('.start-now');
const questionPage = document.querySelector('.question-page');
const next = document.querySelector('.next');
const questionTag = document.querySelector('.question-tag');
const optionOne = document.querySelector('.option-one');
const optionTwo = document.querySelector('.option-two');
const optionThree = document.querySelector('.option-three');
const optionFour = document.querySelector('.option-four');
const questionNo = document.querySelector('.question-no');
let currentQuestion = 1;


startNow.addEventListener('click', () => {
    mainPage.style.display = 'none';
    questionPage.style.display = 'block'
    document.body.style.backgroundColor = '#CCE2C2';

    questionTag.innerText = quiz[0].question;

    optionOne.innerText = quiz[0].options[0];
    optionTwo.innerText = quiz[0].options[1];
    optionThree.innerText = quiz[0].options[2];
    optionFour.innerText = quiz[0].options[3];
    questionNo.innerText = '1 / 25';
})


next.addEventListener( 'click', () => {
    currentQuestion++;
    console.log(currentQuestion) 
    if ( currentQuestion <= quiz.length ) {
        showQuestion( currentQuestion );
    } else {
        alert( "Quiz Finished!" );
    }
} );

function showQuestion ( index ) {
    questionNo.innerText = `${index} / ${quiz.length}`
    questionTag.innerText = quiz[ index ].question;
    optionOne.innerText = quiz[ index ].options[ 0 ];
    optionTwo.innerText = quiz[ index ].options[ 1 ];
    optionThree.innerText = quiz[ index ].options[ 2 ];
    optionFour.innerText = quiz[ index ].options[ 3 ];
}


