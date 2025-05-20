export default function generateSudoku(difficulty) {
    const solution = createSolvedBoard()
    const puzzle = createPuzzle(solution, difficulty)

    return { puzzle, solution }

}

export function createSolvedBoard() {
    const board = Array(9)
        .fill(0)
        .map(() => Array(9).fill(0));
    solveSudoku(board)

    return board;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
                for (let num of nums) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    if (!board || !board[row] || board[row][col] === num) {
        return false;
    }
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

const createPuzzle = (solution, difficulty) => {
    // const puzzle = solution

    const puzzle = JSON.parse(JSON.stringify(solution))

    let cellsToRemove = 0


    if (difficulty === 'veryeasy') {
        cellsToRemove = 2
    } else if (difficulty === 'easy') {
        cellsToRemove = 35
    } else if (difficulty === 'medium') {
        cellsToRemove = 45
    } else if (difficulty === 'hard') {
        cellsToRemove = 60
    } else if (difficulty === 'veryhard') {
        cellsToRemove = 65
    } else if (difficulty === 'extremehard') {
        cellsToRemove = 70
    }

    const positions = []
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            positions.push([i, j])
        }
    }

    shuffleArray(positions)

    let removed = 0
    console.log('puzzle', puzzle)
    for (const [row, col] of positions) {
        if (removed >= cellsToRemove) break
        const temp = puzzle[row][col]
        puzzle[row][col] = 0
        removed++

    }
    console.log('puzzle AFTER REMOVE', puzzle)
    return puzzle

}

// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


