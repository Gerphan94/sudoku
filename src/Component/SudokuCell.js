import React from "react";


function SudokuCell({ value, isInitial, isSelected, isRelated, onClick, className }) {
    return (
        <div
            className={`w-16 h-16 border border-gray-100 ${className}  flex items-center justify-center cursor-pointer text-lg font-medium transition-colors`}
            onClick={onClick}
        >
            {value !== 0 ? value : ""}
        </div>
    );
}

export default SudokuCell;