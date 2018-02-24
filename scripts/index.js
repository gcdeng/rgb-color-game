window.onload = () => {
    let colorGame = new ColorGame();
    colorGame.init();
}

class ColorGame {
    constructor() {
        this.gameOver = false;
        this.gameMode = 'easy';
        this.answerColor = '';
        this.colors = [];
        this.timeout = 5;
        this.countDownId;
        this.blinkBgId;
        
        this.body = document.querySelector('body');
        this.title = document.querySelector('.color-picked');
        this.message = document.querySelector('#message');
        this.cards = document.querySelectorAll('.card');
        this.resetBtn = document.querySelector('.reset');
        this.resetText = document.querySelector('.reset-text');
        this.navItems = document.querySelectorAll('.nav-item');
        this.countDownText = document.querySelector('#countdown');
        this.brand = document.querySelector('.navbar-brand');

        this.addClickEventToCards();
        this.addClickEventToResetBtn();
        this.addClickEventToNavItmes();
    }

    init() {
        this.gameOver = false;
        this.clearAllTimingEvents();
        this.setGameMode();
        this.colors = getRandomColors(this.cardNum);
        this.answerColor = getAnswerColor(this.colors);
        this.setTitle();
        this.setMessage('WHAT\'S THE COLOR?');
        this.setColorOfCards();
        this.setResetText();
        this.setBodyBgColor();
    }

    overGame(){
        this.gameOver=true;
        this.clearAllTimingEvents();
        this.setMessage();
        this.setColorOfCards();
        this.setResetText();
        this.setBodyBgColor();
    }

    addClickEventToCards(){
        this.cards.forEach((card, i)=>{
            card.addEventListener('click', (e)=>{
                this.checkAnswer(e);
            });
        });
    }

    addClickEventToResetBtn(){
        this.resetBtn.addEventListener('click', (e)=>{
            this.init();
        });
    }

    addClickEventToNavItmes(){
        this.navItems.forEach(item=>{
            item.addEventListener('click', ()=>{
                this.removeActiveClassFromNavItems();
                item.classList.add('active');
                this.gameMode = item.querySelector('a').innerHTML.toLowerCase();
                this.init();
            });
        })
    }

    clearAllTimingEvents(){
        clearInterval(this.countdownId);
        clearTimeout(this.blinkBgId);
    }

    setGameMode(){
        switch(this.gameMode){
            case 'easy':
                this.cardNum=3;
                this.countDownText.style.display = 'none';
                break;
            case 'hard':
                this.cardNum=6;
                this.countDownText.style.display = 'none';
                break;
            case 'nightmare':
                this.cardNum=6;
                this.countDownText.style.display = 'block';
                this.countDown();
                break;
        }
    }

    countDown(){
        this.timeout = 5;
        this.countDownText.innerHTML = this.timeout;
        this.countdownId = setInterval(()=>{
            this.timeout--;
            this.countDownText.innerHTML = this.timeout;
            this.blinkBg();
            if(this.timeout===0){
                if(!this.gameOver){
                    this.overGame();
                }
            }
        }, 1000)
    }

    setTitle(){
        this.title.innerHTML = this.answerColor.toUpperCase();
    }

    setMessage(msg){
        if(msg!=undefined) {
            this.message.innerHTML = msg.toUpperCase();
        } else if(this.gameMode==='nightmare' && this.timeout===0) {
            this.message.innerHTML = 'TIMEOUT!';
        } else if(this.gameOver){
            this.message.innerHTML = 'CORRECT!';
        } else {
            this.message.innerHTML = 'TRY AGAIN!';
        }
    }

    setBodyBgColor(){
        if(this.gameOver){
            this.body.style.backgroundColor = this.answerColor;
        } else {
            this.body.style.backgroundColor = 'rgb(35, 35, 35)';
        }
    }

    setResetText(){
        if(this.gameOver){
            this.resetText.innerHTML = 'Play Again';
        } else {
            this.resetText.innerHTML = 'New Color';
        }
    }

    setColorOfCards(){
        if(this.gameOver){
            // dispaly all card with white color after correct
            this.cards.forEach(card=>{
                card.style.backgroundColor = '#fff';
                card.style.opacity = 1;
                card.style.cursor = 'default';
            });
        } else {
            this.cards.forEach((card, i)=>{
                if(this.colors[i]){
                    card.style.display = 'block';
                    card.style.backgroundColor = this.colors[i];
                    card.style.opacity = 1;
                    card.style.cursor = 'pointer';
                } else {
                    card.style.display = 'none';
                }
            });   
        }
    }

    checkAnswer(e){
        if(this.gameOver){
            return false;
        }
        if(e.target.style.backgroundColor === this.answerColor){
            // correct
            this.overGame();
        } else {
            // try again
            this.setMessage();
            e.target.style.opacity = 0;
        }
    }

    removeActiveClassFromNavItems(){
        this.navItems.forEach(item=>{
            item.classList.remove('active');
        });
    }

    blinkBg() {
        this.body.style.backgroundColor = '#fff';
        this.blinkBgId = setTimeout(()=>{
            this.body.style.backgroundColor = 'rgb(35, 35, 35)';
            clearTimeout(this.blinkBgId);
        }, 100);
    }
}

const getColor = () => {
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}

const getRandomColors = (cardNum) => {
    let colors = [];
    for(let i=0; i<cardNum; i++){
        colors.push(getColor())
    }
    return colors;
}

const getAnswerColor = (colors) => {
    return colors[Math.floor(Math.random()*colors.length)];
}
