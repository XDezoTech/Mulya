import { useState, useEffect } from 'react';

/**
 * Countdown Timer component
 * @param {Date|string} endTime - End time of the auction
 * @param {boolean} mini - Whether to display a mini version
 * @returns {JSX.Element} Countdown timer component
 */
function CountdownTimer({ endTime, mini = false }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Calculate time difference
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endTime);
      const difference = end - now;

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const timeLeftUpdated = calculateTimeLeft();
      setTimeLeft(timeLeftUpdated);
    }, 1000);

    // Cleanup interval
    return () => clearInterval(timer);
  }, [endTime]);

  if (isExpired) {
    return (
      <div className="font-semibold text-red-500">
        {mini ? 'Ended' : 'Auction has ended'}
      </div>
    );
  }

  if (mini) {
    // Compact version for cards
    return (
      <div className="text-brand-600 text-sm font-medium">
        {timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}
        {timeLeft.hours}h {timeLeft.minutes}m left
      </div>
    );
  }

  // Full DaisyUI countdown version
  return (
    <div className="grid auto-cols-max grid-flow-col gap-2 text-center">
      <div className="flex flex-col p-1">
        <span className="countdown font-mono text-2xl">
          <span
            style={{ '--value': timeLeft.days }}
            aria-live="polite"
            aria-label={`${timeLeft.days} days`}
          >
            {timeLeft.days}
          </span>
        </span>
        <span className="text-xs">days</span>
      </div>
      <div className="flex flex-col p-1">
        <span className="countdown font-mono text-2xl">
          <span
            style={{ '--value': timeLeft.hours }}
            aria-live="polite"
            aria-label={`${timeLeft.hours} hours`}
          >
            {timeLeft.hours}
          </span>
        </span>
        <span className="text-xs">hrs</span>
      </div>
      <div className="flex flex-col p-1">
        <span className="countdown font-mono text-2xl">
          <span
            style={{ '--value': timeLeft.minutes }}
            aria-live="polite"
            aria-label={`${timeLeft.minutes} minutes`}
          >
            {timeLeft.minutes}
          </span>
        </span>
        <span className="text-xs">min</span>
      </div>
      <div className="flex flex-col p-1">
        <span className="countdown font-mono text-2xl">
          <span
            style={{ '--value': timeLeft.seconds }}
            aria-live="polite"
            aria-label={`${timeLeft.seconds} seconds`}
          >
            {timeLeft.seconds}
          </span>
        </span>
        <span className="text-xs">sec</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
