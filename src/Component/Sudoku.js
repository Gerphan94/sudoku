import React, { useState, useEffect } from "react";
import SudokuBoard from "./SudokuBoard";
import SudokuBoardPaused from "./SudokuBoardPaused";
import generateSudoku from "../Lib/SudokuGen";
import Timer from "./Timer";
import { use } from "react";



function Sudoku() {

    // const [puzzle, solution] = generateSudoku('easy')

    const [difficulty, setDifficulty] = useState('medium')
    const [isPaused, setIsPaused] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [board, setBoard] = useState([])
    const [viewBoard, setViewBoard] = useState([])
    const [initialBoard, setInitialBoard] = useState([])

    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });


    const levels = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
        { value: 'veryhard', label: 'Very Hard' },
    ]



    useEffect(() => {
        const initialBoard = Array(9)
            .fill(0)
            .map(() => Array(9).fill(0));
        setBoard(initialBoard);
    }, []);

    useEffect(() => {
        newGame(difficulty)
    }, [difficulty])

    const newGame = (level) => {
        const { puzzle, solution } = generateSudoku(level)
        if (puzzle !== undefined) {
            setBoard(JSON.parse(JSON.stringify(puzzle)))
            setViewBoard(JSON.parse(JSON.stringify(puzzle)))
            setInitialBoard(JSON.parse(JSON.stringify(puzzle)))
        }

    }
    const handleDifficultyChange = (value) => {
        setDifficulty(value)
        newGame(value)
        setSelectedCell({ row: null, col: null })
    }

    const updateBoard = (row, col, value) => {
        if (initialBoard[row][col] !== 0) return;

        const newBoard = [...board];
        newBoard[row][col] = value;
        setBoard(newBoard);
        setViewBoard(newBoard);
    }

    useEffect(() => {
        if (isPaused) {
            const emptyBoard = Array(9).fill(0).map(() => Array(9).fill(0));
            setViewBoard(emptyBoard);
        } else {
            setViewBoard(board)
        }

    }, [isPaused, board])

    



    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div>
                <div className="p-2  border-b text-left text-blue-900 text-4xl font-bold">
                    Sudoku
                </div>
                <div className="w-full p-2">
                    <div className="flex space-x-2">
                        {levels.map((level) => (
                            <button
                                key={level.value}
                                className={`border-b  px-2 py-1 ${difficulty === level.value ? 'border-blue-500 text-blue-500 font-medium' : ''}`}
                                onClick={() => handleDifficultyChange(level.value)}>
                                {level.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex">
                    <div className="">

                        <SudokuBoard
                            board={viewBoard}
                            selectedCell={selectedCell}
                            setSelectedCell={setSelectedCell}
                            updateBoard={updateBoard}
                            initialBoard={initialBoard}
                            isPaused={isPaused}
                            setIsPaused={setIsPaused}
                        />



                    </div>
                    <div className="flex px-4 flex-col justify-between">
                        <div>
                            <Timer isPaused={isPaused} setIsPaused={setIsPaused} />
                        </div>

                        <div className="grid grid-cols-3 gap-2 select-none">
                            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                                <button className="size-14 rounded-md border select-none hover:scale-110 hover:font-bold" key={num}>{num}</button>
                            ))}
                            <button className="size-14 rounded-md border p-2" >X</button>

                        </div>
                        <button className="border rounded-md p-2">New game</button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Sudoku;