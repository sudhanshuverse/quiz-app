import { quiz } from "./questions.js";

const body = document.querySelector( 'body' );
const mainPage = document.querySelector( '.main-page' );
const startNow = document.querySelector( '.start-now' );
const questionPage = document.querySelector( '.question-page' );
const next = document.querySelector( '.next' );
const questionTag = document.querySelector( '.question-tag' );
const allOptions = document.querySelectorAll( '.options' );
const questionNo = document.querySelector( '.question-no' );
const sound = document.querySelector( '.sound-image' );
const timerTag = document.querySelector( '.timer p' );
const clickSound = document.querySelector( '.click-sound' );
const warningSound = document.querySelector( '.warning-sound' );
const score = document.querySelector( '.score' );
const incorrect = document.querySelector( '.incorrect' );
const correct = document.querySelector( '.correct' );
const completed = document.querySelector( '.completed' );
const correctAndTotal = document.querySelector( '.correct-and-total' );

let currentQuestion = 0;
let timeLeft = 30;
let played15 = false;
let played5 = false;
let countdown;
let optionValue = null;

// Score tracking
let scoreCorrect = 0;
let scoreWrong = 0;

// Helper function to check if sound should play
function isSoundActive () {
    return sound.getAttribute( "src" ) === "./assets/sound-on.png";
}

// Start quiz
startNow.addEventListener( 'click', () => {
    mainPage.style.display = 'none';
    questionPage.style.display = 'block';
    body.style.backgroundColor = '#CCE2C2';

    showQuestion( currentQuestion );
    startCountdown();
} );

// Next question button
next.addEventListener( 'click', () => {
    if ( optionValue === null ) {
        if ( isSoundActive() ) warningSound.play();
        alert( "Please select an option before moving to the next question!" );
        return;
    }

    currentQuestion++;
    if ( currentQuestion < quiz.length ) {
        showQuestion( currentQuestion );
        startCountdown();
    } else {
        clearInterval( countdown );
        questionPage.style.display = 'none';
        score.style.display = 'block';

        const correctPercent = Math.round( ( scoreCorrect / quiz.length ) * 100 );
        const incorrectPercent = 100 - correctPercent;

        correct.innerText = `${ correctPercent }%`;
        incorrect.innerText = `${ incorrectPercent }%`;

        completed.style.width = `${ correctPercent }%`;
        correctAndTotal.innerText = `${ scoreCorrect } / ${ quiz.length }`;
    }
} );

// Show a question
function showQuestion ( index ) {
    const q = quiz[ index ];

    optionValue = null;
    questionNo.innerText = `${ index + 1 } / ${ quiz.length }`;
    questionTag.innerText = q.question;

    allOptions.forEach( ( opt, i ) => {
        opt.innerText = q.options[ i ];
        opt.classList.remove( 'correct', 'wrong', 'disabled' );
        opt.style.pointerEvents = 'auto';
        opt.onclick = () => handleOptionClick( opt, i, q.answer );
    } );
}

// Handle option click
function handleOptionClick ( opt, idx, correctIndex ) {
    if ( optionValue !== null ) return;
    optionValue = idx;

    allOptions.forEach( o => {
        o.classList.add( 'disabled' );
        o.style.pointerEvents = 'none';
    } );

    if ( isSoundActive() ) clickSound.play();

    if ( idx === correctIndex ) {
        opt.classList.add( 'correct' );
        scoreCorrect++;
        console.log( "Correct" );
    } else {
        opt.classList.add( 'wrong' );
        allOptions[ correctIndex ].classList.add( 'correct' );
        scoreWrong++;
        console.log( "Wrong" );
    }

    console.log( `Score → Correct: ${ scoreCorrect }, Wrong: ${ scoreWrong }` );
}

// Sound toggle
sound.addEventListener( "click", () => {
    const isCurrentlyOn = isSoundActive();
    sound.setAttribute( "src", isCurrentlyOn ? "./assets/sound-off.png" : "./assets/sound-on.png" );
    if ( !isCurrentlyOn ) clickSound.play(); // play click only if turning sound on
} );

// Countdown timer
function startCountdown () {
    clearInterval( countdown );
    timeLeft = 30;
    played15 = false;
    played5 = false;

    countdown = setInterval( () => {
        timerTag.innerText = `${ timeLeft < 10 ? '0' + timeLeft : timeLeft }:00`;

        if ( timeLeft < 0 ) {
            clearInterval( countdown );
            timerTag.innerText = "⏰ Time's up!";
            next.click();
        } else if ( timeLeft < 5 ) {
            body.style.backgroundColor = '#DBADAD';
            timerTag.style.backgroundColor = '#C50C00';
            next.style.color = '#C50C00';
            if ( !played5 && isSoundActive() ) {
                warningSound.play();
                played5 = true;
            }
        } else if ( timeLeft < 15 ) {
            body.style.backgroundColor = '#D4D69F';
            timerTag.style.backgroundColor = '#C5B100';
            next.style.color = '#C5B100';
            if ( !played15 && isSoundActive() ) {
                warningSound.play();
                played15 = true;
            }
        } else {
            body.style.backgroundColor = '#CCE2C2';
            timerTag.style.backgroundColor = '#1bdf2b';
            next.style.color = '#2BE22B';
        }

        timeLeft--;
    }, 1000 );
}
