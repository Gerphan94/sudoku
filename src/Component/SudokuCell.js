import React, { useState } from "react";


function SudokuCell({ value, isInitial, isSelected, selectedNum, isRelated, onCellClick, isDuplicate }) {

    const [isHovered, setIsHovered] = useState(false);

    // console.log('isDuplicate', isDuplicate, value)
    const textClassName = isDuplicate ? "text-red-500" : isSelected ? "text-white" : isRelated ? "text-[#2A4759]" : isInitial ? "text-[#2A4759]" : "text-blue-300";
    const bgClassName = isSelected ? "bg-blue-300" : selectedNum !== 0 && selectedNum === value ? "bg-blue-200" : isRelated ? "bg-blue-100" : "";
    let className = `${textClassName} ${bgClassName}`;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`md:w-16 md:h-16 w-10 h-10 border font-medium !border-gray-100 ${className}  flex items-center justify-center cursor-pointer text-lg  transition-colors`}
            onClick={onCellClick}
        >
            {isHovered && !isInitial && !isSelected && selectedNum !== 0 ? (
                <div className="text-[#F7AD45] text-3xl font-bold">
                    {selectedNum}
                </div>
            ) : null}
            {value !== 0 ? value : ""}
        </div>
    );
}

export default SudokuCell;