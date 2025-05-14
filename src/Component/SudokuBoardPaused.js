import React from "react";

function SudokuBoardPaused() {

    const emptyBoard = Array(9)
        .fill(0)
        .map(() => Array(9).fill(0));
    return (

        <>
            <div className="">
                {emptyBoard.map((row, rowIndex) => {
                    const border = rowIndex === 0 ? "border-t-2" : rowIndex % 3 === 2 ? "border-b-2" : "";
                    return (
                        <div key={rowIndex} className={`flex ${border}`}>
                            {row.map((cell, cellIndex) => {
                                const border = cellIndex === 0 ? "border-l-2" : cellIndex % 3 === 2 ? "border-r-2" : "";
                                return (
                                    <div key={cellIndex} className={`w-16 h-16 border ${border} flex items-center justify-center text-lg font-bold`}>
0
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default SudokuBoardPaused;