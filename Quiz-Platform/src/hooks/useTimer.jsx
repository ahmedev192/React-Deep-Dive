import { useState, useEffect } from "react";

export function useTimer(initialTime, onExpire) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onExpire();
    }
  }, [timeLeft, onExpire]);

  return [timeLeft, setTimeLeft];
}
