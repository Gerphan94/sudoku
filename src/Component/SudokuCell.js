import React from "react";


function SudokuCell({ value, isInitial, isSelected,selectedNum, isRelated, onCellClick }) {

    const className = `${isInitial ? " text-black" : "text-blue-300"} 
    ${isSelected ? "!bg-blue-300 !text-white" : selectedNum !== 0 && selectedNum === value ? "bg-blue-200 !text-white" : isRelated ? "bg-blue-100" : ""} `;

    return (
        <div
            className={`w-16 h-16 border font-medium !border-gray-100 ${className}  flex items-center justify-center cursor-pointer text-lg  transition-colors`}
            onClick={onCellClick}
        >
            {value !== 0 ? value : ""}
        </div>
    );
}

export default SudokuCell;