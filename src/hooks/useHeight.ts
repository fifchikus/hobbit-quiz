import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'hobbit_height';
const DEFAULT_HEIGHT = 100;

export const useHeight = () => {
  const [height, setHeight] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : DEFAULT_HEIGHT;
  });
  const [isGrowing, setIsGrowing] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, height.toString());
  }, [height]);

  const grow = useCallback(() => {
    setIsGrowing(true);
    setHeight((prev) => prev + 1);
    setTimeout(() => setIsGrowing(false), 500);
  }, []);

  const reset = useCallback(() => {
    setHeight(DEFAULT_HEIGHT);
  }, []);

  return {
    height,
    isGrowing,
    grow,
    reset,
  };
};
