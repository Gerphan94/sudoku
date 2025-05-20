import { FcClock } from "react-icons/fc";


function WinGame({ board, totalTime, newGame }) {


    const handlePlayAgain = () => {

    }

    const handleNewGame = () => {
        newGame()
    }


    return (
        <>
            <div className="w-full h-full cursor-pointer bg-[radial-gradient(circle,_#A1EEBD,_white)] md:p-10 ">
                <div className="md:flex ">
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

                    <div className="flex flex-col justify-between items-center w-full h-full p-4">
                        <div className="text-3xl font-bold text-green-600 mb-4">🎉 You Win!🎉 </div>

                        <div className="py-10 flex items-center text-2xl">
                            <div><FcClock className="w-10 h-10" /></div>
                            <div className="font-bold text-[#102E50]">{totalTime}</div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Play Again</button>
                            <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleNewGame}
                            
                            >New Game</button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default WinGame;