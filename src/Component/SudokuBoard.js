import React, { useState, useEffect } from "react";

import SudokuCell from "./SudokuCell";

const createSudokuBoard = () => {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push(new Array(9).fill(0));
    }
    const solve = (row, col) => {
        if (row === 9 - 1 && col === 9) {
            return true;
        }
        if (col === 9) {
            row++;
            col = 0;
        }
        if (board[row][col] !== 0) {
            return solve(row, col + 1);
        }
        for (let i = 1; i <= 9; i++) {
            if (isValid(board, row, col, i)) {
                board[row][col] = i;
                if (solve(row, col + 1)) {
                    return true;
                }
                board[row][col] = 0;
            }
        }
        return false;
    };
    const isValid = (board, row, col, num) => {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) {
                return false;
            }
        }
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
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
    };
    solve(0, 0);
    return board;
};


function SudokuBoard({ board, onCellClick }) {

    const initialBoard = createSudokuBoard();
    console.log('initialBoard', initialBoard)

    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen">
                <div className="">
                    {initialBoard.map((row, rowIndex) => {
                        const border = rowIndex === 0 ? "border-t-2" : rowIndex % 3 === 2 ? "border-b-2" : "";

                        return (
                            <div key={rowIndex} className={`flex ${border}`}>
                                {row.map((cell, cellIndex) => {

                                    const border = cellIndex  === 0 ? "border-l-2" : cellIndex % 3 === 2 ? "border-r-2" : "";

                                    return (
                                        <div className={`flex ${border}`}>
                                            <SudokuCell
                                                key={cellIndex}
                                                value={cell}
                                                rowIndex={rowIndex}
                                                cellIndex={cellIndex}
                                                onCellClick={onCellClick}
                                            />
                                        </div>

                                    )
                                }


                                )}
                            </div>
                        );
                    })}
                </div>

            </div>


        </>
    );
}

export default SudokuBoard;