// CountdownTimer.tsx
'use client'
import React, { useEffect, useState } from 'react';


const getTimeLeft = (target)  => {
  const total = target.getTime() - new Date().getTime();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, expired: false };
};

const CountdownTimer = ({
  targetDate,
  onComplete,
  render,
}) => {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = getTimeLeft(target);
      setTimeLeft(updated);

      if (updated.expired) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target, onComplete]);

  if (render) {
    return <>{render(timeLeft)}</>;
  }

  return (
    <div>
      {timeLeft.expired ? (
        <span>Bidding Closed!</span>
      ) : (
        <span className=' font-sans'>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      )}
    </div>
  );
};

export default CountdownTimer;
