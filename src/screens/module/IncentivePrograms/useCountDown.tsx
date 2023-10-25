import { useEffect, useState } from 'react';

const Countdown = (targetDate) => {
    const [timeLeft, setTimeLeft] = useState(targetDate);

    useEffect(() => {
        if (timeLeft <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft]);

    let days = (Math.floor(timeLeft / 86400)).toString(); // 86400 seconds in a day
    let hours = (Math.floor((timeLeft % 86400) / 3600)).toString(); // 3600 seconds in an hour
    let minutes = (Math.floor((timeLeft % 3600) / 60)).toString();
    let seconds = (timeLeft % 60).toString();
    if (Number(days) < 10) {
        days = '0' + days;
    } if (Number(hours) < 10) {
        hours = '0' + hours;
    } if (Number(minutes) < 10) {
        minutes = '0' + minutes;
    } if (Number(seconds) < 10) {
        seconds = '0' + seconds;
    }
    return [days, hours, minutes, seconds];
};

export { Countdown };
