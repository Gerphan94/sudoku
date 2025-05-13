import React, { useState, useEffect } from "react";

import SudokuCell from "./SudokuCell";




function SudokuBoard({ board, onCellClick }) {


    return (
        <>
            <div className="">
                <div className="">
                    {board.map((row, rowIndex) => {
                        const border = rowIndex === 0 ? "border-t-2" : rowIndex % 3 === 2 ? "border-b-2" : "";

                        return (
                            <div key={rowIndex} className={`flex ${border}`}>
                                {row.map((cell, cellIndex) => {

                                    const border = cellIndex  === 0 ? "border-l-2" : cellIndex % 3 === 2 ? "border-r-2" : "";

                                    return (
                                        <div key={cellIndex} className={`flex ${border}`}>
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