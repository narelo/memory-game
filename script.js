const cards = document.querySelectorAll('.card');
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard(){//vira carta
    if(lockBoard){ return; }
    if(this === firstCard){ return; } //tratamento de duplo click

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch(){//cartas iguais
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards(); //desabilita cartas
        return;
    }
    unflipCards(); //desvira cartas
}

function disableCards(){//desabilita o click nas cartas iguais encontradas
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards(){//desvira carta
    lockBoard = true; //para n haver click antes da desvirada das cartas
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard(){//reseta tabuleiro
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){//embaralha cartas
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

cards.forEach((card) => {//click na carta
    card.addEventListener('click', flipCard)
});