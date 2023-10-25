import { useEffect, useState } from 'react';

const useCountdown = (targetDate: any) => {
  const [timeLeft, setTimeLeft] = useState(targetDate);

  useEffect(() => {

    if (timeLeft <= 0) {
      //  console.log("---------------------")
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const day = Math.floor(timeLeft / 86400)
  .toString()
  .padStart(2, '0');
  const hours = Math.floor(timeLeft / 3600)
  .toString()
  .padStart(2, '0');
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return [day, hours, minutes, seconds];
};

export { useCountdown };
