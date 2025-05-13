import React, { useState, useEffect } from "react";
import SudokuBoard from "./SudokuBoard";

import generateSudoku from "../Lib/SudokuGen";
function Sudoku() {

    // const [puzzle, solution] = generateSudoku('easy')

    const [difficulty, setDifficulty] = useState('easy')
    const [board, setBoard] = useState([])
    const [initialBoard, setInitialBoard] = useState([])

    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });



    useEffect(() => {
        const initialBoard = Array(9)
            .fill(0)
            .map(() => Array(9).fill(0));
        setBoard(initialBoard);
    }, []);

    const newGame = (level) => {
        const { puzzle, solution } = generateSudoku(level)
        if (puzzle !== undefined) {
            setBoard(JSON.parse(JSON.stringify(puzzle)))
            setInitialBoard(JSON.parse(JSON.stringify(puzzle)))
        }

    }

    // useEffect(() => {
    //     newGame()
    // }, [difficulty])

    const handleDifficultyChange = (value) => {
        setDifficulty(value)
        newGame(value)
        setSelectedCell({ row: null, col: null })
    }


    const updateBoard =  (row, col, value) => {
        if (initialBoard[row][col] !== 0) return;

        const newBoard = [...board];
        newBoard[row][col] = value;
        setBoard(newBoard);
    }



    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="flex">
                <div className="p-6 space-y-3">
                    <button
                        className={`w-full border rounded-lg p-2 ${difficulty === 'easy' ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleDifficultyChange('easy')}>
                        Easy
                    </button>
                    <button
                        className={`w-full border rounded-lg p-2 ${difficulty === 'medium' ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleDifficultyChange('medium')}>
                        Medium
                    </button>
                    <button
                        className={`w-full border rounded-lg p-2 ${difficulty === 'hard' ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleDifficultyChange('hard')}>
                        Hard
                    </button>
                    <button
                        className={`w-full border rounded-lg p-2 ${difficulty === 'veryhard' ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleDifficultyChange('veryhard')}>
                        Very Hard
                    </button>

                </div>
                <SudokuBoard
                    board={board}
                    selectedCell={selectedCell}
                    setSelectedCell={setSelectedCell}
                    updateBoard={updateBoard}
                    initialBoard={initialBoard}
                />
                <div className="p-6 flex flex-col space-y-3">
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                        <button className="size-10 rounded-full border p-2" key={num}>{num}</button>
                    ))}
                    <button className="size-10 rounded-full border p-2" >X</button>

                </div>
            </div>

        </div>
    );
}

export default Sudoku;