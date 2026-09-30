import { useEffect, useState } from "react";

function LiveTime(){
    const [time,setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            setTime(now);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <span>{time.toLocaleString("en-GB", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })}</span>
}

export default LiveTime;