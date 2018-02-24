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

class ColorGame {
    constructor() {
        this.gameOver = false;
        this.gameMode = 'easy';
        this.answerColor = '';
        this.colors = [];
        this.setGameMode();
        
        this.body = document.querySelector('body');
        this.title = document.querySelector('.color-picked');
        this.message = document.querySelector('.message');
        this.cards = document.querySelectorAll('.card');
        this.resetBtn = document.querySelector('.reset');
        this.resetText = document.querySelector('.reset-text');
        this.navItems = document.querySelectorAll('.nav-item');

        this.addClickEventToCards();
        this.addClickEventToResetBtn();
        this.addClickEventToNavItmes();
    }

    setGameMode(){
        switch(this.gameMode){
            case 'easy':
                this.cardNum=3;
                break;
            case 'hard':
                this.cardNum=6;
                break;
            case 'nightmare':
                this.cardNum=6;
                break;
        }
    }

    setTitle(){
        this.title.innerHTML = this.answerColor.toUpperCase();
    }

    setMessage(msg){
        if(msg!=undefined) {
            this.message.innerHTML = msg.toUpperCase();
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
            this.gameOver = true;
            this.setMessage();
            this.setColorOfCards();
            this.setResetText();
            this.setBodyBgColor();
        } else {
            // try again
            this.setMessage();
            e.target.style.opacity = 0;
        }
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
            if(this.gameOver){
                this.reset();
            } else {
                this.init();
            }
        })
    }

    init(){
        this.setGameMode();
        this.colors = getRandomColors(this.cardNum);
        this.answerColor = getAnswerColor(this.colors);
        this.setTitle();
        this.setMessage('WHAT\'S THE COLOR?');
        this.setColorOfCards();
        this.setResetText();
        this.setBodyBgColor();
    }

    reset(){
        this.gameOver = false;
        this.init();
    }

    removeActiveClassFromNavItems(){
        this.navItems.forEach(item=>{
            item.classList.remove('active');
        });
    }
    
    addClickEventToNavItmes(){
        this.navItems.forEach(item=>{
            item.addEventListener('click', ()=>{
                this.removeActiveClassFromNavItems();
                item.classList.add('active');
                let selectedMode = item.querySelector('a').innerHTML.toLowerCase();
                if(selectedMode !== this.gameMode){
                    this.gameMode = selectedMode;
                    this.init();
                }
            });
        })
    }
}

window.onload = () => {
    let colorGame = new ColorGame();
    colorGame.init();
}
