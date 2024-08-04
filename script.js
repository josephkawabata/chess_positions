let board, game;
let initialPosition = {};
let pieceCount = 16;

document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('chessboard');
    const beginButton = document.getElementById('begin-button');
    const submitButton = document.getElementById('submit-button');
    const playAgainButton = document.getElementById('play-again-button');
    const setPieceCountButton = document.getElementById('set-piece-count');
    const pieceCountInput = document.getElementById('piece-count');
    const messageElement = document.getElementById('message');

    function generateRandomPosition() {
        game = new Chess();
        initialPosition = {};
        const squares = game.SQUARES;
        for (let i = 0; i < pieceCount; i++) {
            const randomSquare = squares[Math.floor(Math.random() * squares.length)];
            const piece = game.get(randomSquare);
            if (piece) {
                initialPosition[randomSquare] = piece.color + piece.type;
                game.remove(randomSquare);
            } else {
                i--; // Ensure we get the exact number of pieces
            }
        }
        return initialPosition;
    }

    function startGame() {
        const randomPosition = generateRandomPosition();
        board.position(randomPosition);
        setTimeout(() => {
            board.clear();
            beginButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }, 3000);
    }

    function checkSolution() {
        const userPosition = board.position();
        let correct = true;
        for (const square in initialPosition) {
            if (initialPosition[square] !== userPosition[square]) {
                correct = false;
                break;
            }
        }

        if (correct) {
            messageElement.textContent = "Correct! Well done!";
        } else {
            messageElement.textContent = "Incorrect. Here's the correct position.";
            board.position(initialPosition);
        }

        submitButton.style.display = 'none';
        playAgainButton.style.display = 'inline-block';
    }

    board = Chessboard(boardElement, {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true,
        position: 'start'
    });

    beginButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', checkSolution);
    playAgainButton.addEventListener('click', () => location.reload());

    setPieceCountButton.addEventListener('click', () => {
        pieceCount = parseInt(pieceCountInput.value, 10);
        location.reload();
    });
});
