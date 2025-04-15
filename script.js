document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const resetButton = document.getElementById('resetButton');
    const currentDraw = document.getElementById('currentDraw');
    const drawnNumbers = new Set();
    const totalNumbers = 75;

    function getBingoLetter(number) {
        if (number <= 15) return 'B';
        if (number <= 30) return 'I';
        if (number <= 45) return 'N';
        if (number <= 60) return 'G';
        return 'O';
    }

    function clearColumns() {
        ['B', 'I', 'N', 'G', 'O'].forEach(letter => {
            document.getElementById(`${letter}-numbers`).innerHTML = '';
        });
    }

    function updateColumnNumbers() {
        clearColumns();
        const columnNumbers = {
            'B': [], 'I': [], 'N': [], 'G': [], 'O': []
        };

        // Organize numbers by column
        drawnNumbers.forEach(number => {
            const letter = getBingoLetter(number);
            columnNumbers[letter].push(number);
        });

        // Sort and display numbers in each column
        for (const letter in columnNumbers) {
            const numbers = columnNumbers[letter].sort((a, b) => a - b);
            const column = document.getElementById(`${letter}-numbers`);
            numbers.forEach(number => {
                const span = document.createElement('span');
                span.textContent = number;
                column.appendChild(span);
            });
        }
    }

    function drawNumber() {
        if (drawnNumbers.size >= totalNumbers) {
            currentDraw.textContent = 'FIM!';
            drawButton.disabled = true;
            return;
        }

        let number;
        do {
            number = Math.floor(Math.random() * totalNumbers) + 1;
        } while (drawnNumbers.has(number));

        drawnNumbers.add(number);
        const letter = getBingoLetter(number);
        currentDraw.textContent = `${letter}-${number}`;
        updateColumnNumbers();

        if (drawnNumbers.size >= totalNumbers) {
            drawButton.disabled = true;
        }
    }

    function resetGame() {
        if (confirm('Tem certeza que deseja zerar o jogo?')) {
            drawnNumbers.clear();
            currentDraw.textContent = '--';
            drawButton.disabled = false;
            clearColumns();
        }
    }

    drawButton.addEventListener('click', drawNumber);
    resetButton.addEventListener('click', resetGame);
});