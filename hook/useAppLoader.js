import { useState, useEffect } from 'react';

export const useAppLoader = (duration = 5000) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoaded;
};