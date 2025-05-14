import React, { useState, useEffect } from "react";

import SudokuCell from "./SudokuCell";

import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";

function SudokuBoard({
    board,
    initialBoard, updateBoard,
    selectedCell,
    setSelectedCell,
    isPaused, setIsPaused
}) {

    const [selectedNum, setSelectedNum] = useState(null);
    const [choosenNumPad, setChoosenNumPad] = useState(0);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, board]);

    const handleKeyDown = (e) => {
        if (!selectedCell) return;
        const { row, col } = selectedCell;
        const key = e.key;
        if (/^[1-9]$/.test(key)) {
            updateBoard(row, col, parseInt(key));
        }
    }

    const handleCellClick = (row, col) => {
        setSelectedCell({ row: row, col: col })
        setSelectedNum(board[row][col])
    }

    const isSameBox = (row1, col1, row2, col2) => Math.floor(row1 / 3) === Math.floor(row2 / 3) && Math.floor(col1 / 3) === Math.floor(col2 / 3);

    return (
        <>
            <div className="select-none relative">
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
                                                selectedNum={selectedNum}
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
                {isPaused &&
                    <div className="w-full h-full top-0 left-0 absolute cursor-pointer"
                        onClick={() => setIsPaused(false)}>
                        <FaCirclePlay className="size-14 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2973B2]" />
                    </div>}

            </div>




        </>
    );
}

export default SudokuBoard;