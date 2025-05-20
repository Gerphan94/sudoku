import React, { useState, useEffect, useCallback } from "react";
import SudokuBoard from "./SudokuBoard";
import generateSudoku from "../Lib/SudokuGen";
import { Timer } from "./Timer";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { GoLightBulb } from "react-icons/go";
import { LuPencilLine } from "react-icons/lu";
import WinGame from "./WinGame";

function Sudoku() {

    // const [puzzle, solution] = generateSudoku('easy')
    console.log('welcome to sudoku')
    //   console.trace();


    const [difficulty, setDifficulty] = useState('medium')
    const [isCheckDuplicate, setIsCheckDuplicate] = useState(true)
    const [board, setBoard] = useState([])
    const [solution, setSolution] = useState([])
    const [viewBoard, setViewBoard] = useState([])
    const [initialBoard, setInitialBoard] = useState([])
    const [isCompleted, setIsCompleted] = useState(true);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [totalTime, setTotalTime] = useState('00:00');
    const [useCount, setUseCount] = useState([]);


    const [nCheck, setNCheck] = useState(3)

    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
    const [selectedNumPad, setSelectedNumPad] = useState(0);
    const [selectedNum, setSelectedNum] = useState(0);


    const [hoveredCell, setHoveredCell] = useState({ row: null, col: null });
    const handleMouseEnter = (row, col) => {
        setHoveredCell({ row, col });
    };
    const handleMouseLeave = () => {
        setHoveredCell({ row: null, col: null });
    };

    const levels = [
        { value: 'veryeasy', label: 'Very Easy' },
        { value: 'easy', label: 'Easy' },
        { value: 'medium', label: 'Medium' },
        { value: 'hard', label: 'Hard' },
        { value: 'veryhard', label: 'Very Hard' },
        { value: 'extremehard', label: 'Extreme Hard' },
    ]

    // useEffect(() => {
    //     const initialBoard = Array(9)
    //         .fill(0)
    //         .map(() => Array(9).fill(0));
    //     setBoard(initialBoard);
    // }, []);

    useEffect(() => {
        if (difficulty) {
            try {
                newGame(difficulty);
            } catch (error) {
                console.error("Error starting new game:", error);
            }
        }
    }, [difficulty]);

    const newGame = (level) => {
        const { puzzle, solution } = generateSudoku(level)
        if (puzzle !== undefined) {
            setBoard(JSON.parse(JSON.stringify(puzzle)))
            setViewBoard(JSON.parse(JSON.stringify(puzzle)))
            setInitialBoard(JSON.parse(JSON.stringify(puzzle)))
            setSolution(solution)
            setIsCompleted(false);
            setIsCorrect(false);
            setIsTimerRunning(true);
            setSelectedCell({ row: null, col: null });
            setSelectedNumPad(0);
            setTotalTime('00:00');
            setUseCount(availableNumber(puzzle))
            console.log('------------------', availableNumber(puzzle))
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

    const availableNumber = (board) => {
        const counts = Array(10).fill(0); // index 1–9 used

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = board[i][j];
                if (cell >= 1 && cell <= 9) {
                    counts[cell]++;
                }
            }
        }
        console.log('counts', counts)
        return  counts.slice(1);
    };

    const updateBoard = (row, col, value) => {
        console.log('updateBoard', updateBoard)
        if (initialBoard[row][col] !== 0) return;

        const newBoard = [...board];
        newBoard[row][col] = value;
        setBoard(newBoard);
        setViewBoard(newBoard);
        setUseCount(availableNumber(newBoard))

        const iComplete = newBoard.every((row) => row.every((cell) => cell !== 0));
        if (iComplete) {
            setIsCompleted(true);
            setIsCorrect(checkSolution());
            setIsTimerRunning(false);
        }

    }
    const checkSolution = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] !== solution[row][col]) {
                    return false;
                }
            }
        }
        return true
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
        setSelectedNum(num)
        setSelectedCell({ row: null, col: null })
    }

    // TIMER

    return (
        <>

            <div className="flex justify-center items-center w-screen h-screen select-none">
                <div className="">
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



                    <div className="md:flex relative">
                        {isCorrect &&
                            <div className="absolute top-0 left-0 w-full h-full z-50">
                                <WinGame
                                    board={board}
                                    totalTime={totalTime}
                                    newGame={newGame} />
                            </div>
                        }

                        <div className="z-40">
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
                                isCompleted={isCompleted}
                                selectedNum ={selectedNum}
                                setSelectedNum ={setSelectedNum}
                            />

                        </div>
                        <div className="flex px-4 flex-col justify-between">
                            <div>
                                <Timer
                                    isTimerRunning={isTimerRunning}
                                    isCorrect={isCorrect}
                                    setTotalTime={setTotalTime}
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
                                        disabled={useCount[num-1] === 9}
                                        className={`size-14 rounded-md border select-none hover:scale-110 hover:font-bold disabled:bg-gray-200 disabled:scale-100 disabled:cursor-not-allowed disabled:text-gray-400 ${selectedNumPad === num ? 'border-blue-600 text-blue-600 font-bold' : ''} `}
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