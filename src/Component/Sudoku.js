import React, { useState, useEffect, useCallback } from "react";
import SudokuBoard from "./SudokuBoard";
import generateSudoku from "../Lib/SudokuGen";
import { Timer } from "./Timer";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { GoLightBulb } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";


function Sudoku() {

    // const [puzzle, solution] = generateSudoku('easy')
    console.log('welcome to sudoku')

    const [difficulty, setDifficulty] = useState('medium')
    const [isCheckDuplicate, setIsCheckDuplicate] = useState(true)
    const [isCompleted, setIsCompleted] = useState(false)
    const [board, setBoard] = useState([])
    const [solution, setSolution] = useState([])
    const [viewBoard, setViewBoard] = useState([])
    const [initialBoard, setInitialBoard] = useState([])
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const [nCheck, setNCheck] = useState(3)

    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
    const [selectedNumPad, setSelectedNumPad] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [showBox, setShowBox] = useState(false);

    const [hoveredCell, setHoveredCell] = useState({ row: null, col: null });
    const handleMouseEnter = (row, col) => {
        setHoveredCell({ row, col });
    };
    const handleMouseLeave = () => {
        setHoveredCell({ row: null, col: null });
    };



    const levels = [
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
        { value: 'veryhard', label: 'Very Hard' },
    ]

    // useEffect(() => {
    //     const initialBoard = Array(9)
    //         .fill(0)
    //         .map(() => Array(9).fill(0));
    //     setBoard(initialBoard);
    // }, []);

    useEffect(() => {
        newGame(difficulty)
    }, [difficulty])

    const newGame = (level) => {
        const { puzzle, solution } = generateSudoku(level)
        if (puzzle !== undefined) {
            setBoard(JSON.parse(JSON.stringify(puzzle)))
            setViewBoard(JSON.parse(JSON.stringify(puzzle)))
            setInitialBoard(JSON.parse(JSON.stringify(puzzle)))
            setSolution(solution)
            setSeconds(0);
        }
    }



    const changeDifficulty = (value) => {
        setDifficulty(value)
        // newGame(value)
        setSelectedCell({ row: null, col: null })
        if (value === 'veryhard') {
            setIsCheckDuplicate(false);
        } else {
            setIsCheckDuplicate(true);
        }
    }


    const handleDifficultyChange = (value) => {
        if (difficulty === value) return;
        changeDifficulty(value);
    }

    const updateBoard = (row, col, value) => {
        console.log('updateBoard', updateBoard)
        if (initialBoard[row][col] !== 0) return;

        const newBoard = [...board];
        newBoard[row][col] = value;
        setBoard(newBoard);
        setViewBoard(newBoard);
    }

    useEffect(() => {
        if (!isTimerRunning) {
            const emptyBoard = Array(9).fill(0).map(() => Array(9).fill(0));
            setViewBoard(emptyBoard);
        } else {
            setViewBoard(board)
        }

    }, [isTimerRunning, board])



    const handleClickNumPad = (num) => {
        setSelectedNumPad(num)
        setSelectedCell({ row: null, col: null })
    }

    // TIMER






    return (
        <>

            <div className="flex justify-center items-center w-screen h-screen select-none">
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

                    <div className="md:flex">
                        <div className="">
                            <SudokuBoard
                                board={viewBoard}
                                selectedCell={selectedCell}
                                setSelectedCell={setSelectedCell}
                                updateBoard={updateBoard}
                                initialBoard={initialBoard}
                                setIsTimerRunning={setIsTimerRunning}
                                isTimerRunning={isTimerRunning}
                                isCheckDuplicate={isCheckDuplicate}
                                selectedNumPad={selectedNumPad}
                                setSelectedNumPad={setSelectedNumPad}
                            />
                        </div>
                        <div className="flex px-4 flex-col justify-between">
                            <div>
                                <Timer
                                    isTimerRunning={isTimerRunning}
                                />
                            </div>

                            <div>
                                <button
                                    className="border rounded-full p-2"
                                    onClick={() => {
                                        setIsTimerRunning(!isTimerRunning);
                                    }}
                                >{isTimerRunning ? <CiPause1 className="size-6" /> : <CiPlay1 className="size-6" />}

                                </button>
                                <button className=" border rounded-full p-2 ml-2">
                                    <GoLightBulb className="size-6" />
                                </button>
                                <button className="border rounded-full p-2 ml-2">
                                    <LuPencilLine className="size-6" />
                                </button>

                            </div>

                            <div className=" md:grid grid-cols-3 gap-2 hidden select-none py-2">
                                {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                                    <button
                                        key={num}
                                        className={`size-14 rounded-md border select-none hover:scale-110 hover:font-bold ${selectedNumPad === num ? 'border-blue-600 text-blue-600 font-bold' : ''} `}
                                        onClick={() => handleClickNumPad(num)}

                                    >{num}</button>
                                ))}
                                <button className="size-14 rounded-md border p-2"
                                onClick={() => handleClickNumPad(0)}
                                >X</button>

                            </div>
                            <button className="border rounded-md p-2">New game</button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Sudoku;