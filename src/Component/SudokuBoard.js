import React, { useState, useEffect } from "react";

import SudokuCell from "./SudokuCell";

import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";

function SudokuBoard({
    board,
    initialBoard, updateBoard,
    selectedCell,
    setSelectedCell,
    isTimerRunning, setIsTimerRunning,
    isCheckDuplicate,
    selectedNumPad, setSelectedNumPad

}) {
    console.log('board---', board)

    const [choosenNumPad, setChoosenNumPad] = useState(0);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, board]);

    const handleKeyDown = (e) => {
        if (!selectedCell) return;
        const { row, col } = selectedCell;
        const key = e.key;
        if (/^[0-9]$/.test(key)) {
            updateBoard(row, col, parseInt(key));
        }
    }

    const handleCellClick = (row, col) => {
        if (selectedNumPad !== 0) {
            updateBoard(row, col, selectedNumPad);
        }
        setSelectedCell({ row: row, col: col })
        setSelectedNumPad(board[row][col])

    }

    const isSameBox = (row1, col1, row2, col2) => Math.floor(row1 / 3) === Math.floor(row2 / 3) && Math.floor(col1 / 3) === Math.floor(col2 / 3);

    function checkDuplicate( row, col, value) {
        if (isCheckDuplicate === false) return false
        // Check row
        if (initialBoard[row][col] === value) return false;
        for (let c = 0; c < 9; c++) {
            if (c !== col && board[row][c] === value) return true;
        }

        // Check column
        for (let r = 0; r < 9; r++) {
            if (r !== row && board[r][col] === value) return true;
        }

        // Check 3x3 block
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;

        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                if ((r !== row || c !== col) && board[r][c] === value) return true;
            }
        }

        return false; // No duplicates found
    }


    return (
        <>
            <div className="relative">
                <div className="" onKeyDown={(e) => handleKeyDown(e)}>
                    {board.map((row, rowIndex) => {
                        const border = rowIndex === 0 ? "border-t-2" : rowIndex % 3 === 2 ? "border-b-2" : "";
                        return (
                            <div key={rowIndex} className={`flex ${border}`}>
                                {row.map((cell, cellIndex) => {

                                    const border = cellIndex === 0 ? "border-l-2" : cellIndex % 3 === 2 ? "border-r-2" : "";
                                    const isInitial = initialBoard?.[rowIndex]?.[cellIndex] !== 0
                                    const isRelated = selectedCell && selectedCell.row !== null && selectedCell.col !== null && (
                                        selectedCell.row === rowIndex ||
                                        selectedCell.col === cellIndex ||
                                        isSameBox(rowIndex, cellIndex, selectedCell.row, selectedCell.col)
                                    )

                                    return (
                                        <div key={cellIndex} className={`flex ${border}`}>
                                            <SudokuCell
                                                key={cellIndex}
                                                value={cell}
                                                rowIndex={rowIndex}
                                                cellIndex={cellIndex}
                                                isInitial={isInitial}
                                                isRelated={isRelated}
                                                isDuplicate={checkDuplicate(rowIndex, cellIndex, cell)}
                                                selectedNum={selectedNumPad}
                                                isSelected={selectedCell.row === rowIndex && selectedCell.col === cellIndex}
                                                onCellClick={() => handleCellClick(rowIndex, cellIndex)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        );
                    })}
                </div>
                {!isTimerRunning &&
                    <div className="w-full h-full top-0 left-0 absolute cursor-pointer"
                        onClick={() => setIsTimerRunning(true)}>
                        <FaCirclePlay className="size-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2973B2]" />
                    </div>}

            </div>




        </>
    );
}

export default SudokuBoard;