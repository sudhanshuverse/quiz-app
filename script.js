import { quiz } from "./questions.js";

const body = document.querySelector('body');
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
const sound = document.querySelector('.sound-image');
const timerTag = document.querySelector('.timer p');
let currentQuestion = 1;
let timeLeft = 30;

// Insert the question in webpage
startNow.addEventListener('click', () => {
    mainPage.style.display = 'none';
    questionPage.style.display = 'block'
    body.style.backgroundColor = '#CCE2C2';

    questionTag.innerText = quiz[0].question;

    optionOne.innerText = quiz[0].options[0];
    optionTwo.innerText = quiz[0].options[1];
    optionThree.innerText = quiz[0].options[2];
    optionFour.innerText = quiz[0].options[3];
    questionNo.innerText = '1 / 25';
})


next.addEventListener( 'click', () => {
    currentQuestion++;
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


// For sound
let isSoundOn = true;

sound.addEventListener( "click", () => {
    if ( isSoundOn ) {
        sound.setAttribute( "src", "./assets/sound-off.png" );
    } else {
        sound.setAttribute( "src", "./assets/sound-on.png" );
    }
    isSoundOn = !isSoundOn;
} );

// TO show the countdown
const countdown = setInterval( () => {
    timerTag.innerText = `${ timeLeft } : 00`;
    timeLeft--;

    if ( timeLeft < 0 ) {
        clearInterval( countdown );
        timerTag.innerText = "⏰ Time's up!";
    }
    else if ( timeLeft < 5 ) {
        body.style.backgroundColor = '#DBADAD';
        timerTag.style.backgroundColor = '#C50C00';
        next.style.color = '#C50C00';
    }
    else if ( timeLeft < 15 ) {
        body.style.backgroundColor = '#D4D69F';
        timerTag.style.backgroundColor = '#C5B100';
        next.style.color = '#C5B100';
    }
}, 1000 );


