import React, { useState, useEffect } from "react";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";

function Timer({ isPaused, setIsPaused }) {

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (!isPaused) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!interval) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPaused]);


    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (

        <>
            <div className="px-2 flex gap-4 items-center border-b">
                <div className="text-left">
                    <div className="text-sm">Time</div>
                    <div className="text-2xl">{formatTime(seconds)}</div>
                </div>
                <button className="size-full p-3" onClick={() => setIsPaused(!isPaused)}>
                    {isPaused ? <FaCirclePlay className="size-10" /> : <FaCirclePause className="size-10" />}
                </button>
            </div>


        </>
    )
}

export default Timer;