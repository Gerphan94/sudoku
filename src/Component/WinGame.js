


function WinGame({ board }) {
    return (
        <>
            <div className="w-full h-full top-0 left-0 absolute cursor-pointer bg-[radial-gradient(circle,_#A1EEBD,_white)] flex ">
                <div className="top-4 left-4 p-4">
                    <div className="bg-white rounded-lg shadow-lg p-4 inline-block border">
                        {board.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex">
                                {row.map((cell, cellIndex) => (
                                    <div key={cellIndex} className="size-8 border flex items-center justify-center text-sm">
                                        {cell}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-s items-center w-full h-full">
                    <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 You Win!🎉 </h2>
                </div>
            </div>

        </>
    );
}

export default WinGame;