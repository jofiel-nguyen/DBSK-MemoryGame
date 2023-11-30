document.addEventListener("DOMContentLoaded", function () {
    const symbols = ['./assets/1.png', './assets/2.png', './assets/3.png', './assets/4.png', './assets/5.png','./assets/6.png'];
    const totalCards = symbols.length * 2;

    const shuffledSymbols = shuffleArray(symbols.concat(symbols));
    const gameBoard = document.getElementById('game-board');
    let flippedCards = [];
    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('div');
        card.classList.add('card');

        const symbol = document.createElement('img');
        symbol.classList.add('symbol');
        symbol.src = shuffledSymbols[i];
        
        // Set image size dynamically based on the card size
        symbol.onload = function () {
            const imageSize = calculateImageSize(card.offsetWidth, card.offsetHeight, symbol.naturalWidth, symbol.naturalHeight);
            symbol.style.width = imageSize.width + 'px';
            symbol.style.height = imageSize.height + 'px';
        };

        card.appendChild(symbol);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }

    function calculateImageSize(cardWidth, cardHeight, imageWidth, imageHeight) {
        const aspectRatio = imageWidth / imageHeight;
        let newWidth, newHeight;

        if (aspectRatio >= 1) {
            // Landscape or square image
            newWidth = cardWidth;
            newHeight = cardWidth / aspectRatio;
        } else {
            // Portrait image
            newWidth = cardHeight * aspectRatio;
            newHeight = cardHeight;
        }

        return { width: newWidth, height: newHeight };
    }

    function flipCard() {
        if (flippedCards.length < 2) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const symbol1 = card1.querySelector('.symbol').src;  // Changed from textContent to src
        const symbol2 = card2.querySelector('.symbol').src;  // Changed from textContent to src

        if (symbol1 === symbol2) {
            // Match found
            setTimeout(() => {
                card1.style.display = 'none';
                card2.style.display = 'none';
                flippedCards = [];
                checkWin(); // Check if all cards are matched
            }, 500);
        } else {
            // No match, flip the cards back
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }
    }

    function checkWin() {
        const remainingCards = document.querySelectorAll('.card:not([style="display: none;"])');
        if (remainingCards.length === 0) {
            // All cards are matched, display "You win"
            alert('You win!');
            // Show the "Play Again" button
            playAgainButton.style.display = 'block';
        }
    }

    // Add event listener for the "Play Again" button
    const playAgainButton = document.getElementById('play-again-btn');
    playAgainButton.addEventListener('click', playAgain);

    // Function to reset the game
    function playAgain() {
        // Reset the game state
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'block';
            card.classList.remove('flipped');
        });

        // Reshuffle the cards
        const shuffledSymbols = shuffleArray(symbols.concat(symbols));
        for (let i = 0; i < totalCards; i++) {
            const card = cards[i];
            const symbol = card.querySelector('.symbol');
            symbol.src = shuffledSymbols[i];  // Set the src attribute for the image
        }

        // Hide the "Play Again" button
        playAgainButton.style.display = 'none';
    }

    // Your existing shuffleArray function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
