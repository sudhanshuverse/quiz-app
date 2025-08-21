const mainPage = document.querySelector('.main-page');
const startNow = document.querySelector('.start-now');
const questionPage = document.querySelector('.question-page');
const next = document.querySelector('.next');

startNow.addEventListener('click', () => {
    mainPage.style.display = 'none';
    questionPage.style.display = 'block'
    document.body.style.backgroundColor = '#CCE2C2';
})


next.addEventListener('click', () => {
    
})
