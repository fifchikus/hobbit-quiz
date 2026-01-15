import { useState, useCallback } from 'react';
import { Riddle, CreateRiddlePayload } from '@/types/riddle';
import { toast } from '@/hooks/use-toast';

const API_BASE_URL = 'https://evgen.pp.ua/webhook/hobbit-quiz';

export const useRiddles = (getAuthHeader: () => string) => {
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRiddles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_BASE_URL, {
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch riddles: ${response.status}`);
      }

      const data = await response.json();
      setRiddles(Array.isArray(data) ? data : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch riddles';
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeader]);

  const createRiddle = useCallback(async (payload: CreateRiddlePayload) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to create riddle: ${response.status}`);
      }

      toast({
        title: "Success!",
        description: "Riddle added to the collection!",
      });

      await fetchRiddles();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create riddle';
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeader, fetchRiddles]);

  const deleteRiddle = useCallback(async (id: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete riddle: ${response.status}`);
      }

      toast({
        title: "Deleted",
        description: "The riddle has been removed.",
      });

      await fetchRiddles();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete riddle';
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeader, fetchRiddles]);

  const getRandomRiddle = useCallback(() => {
    if (riddles.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * riddles.length);
    return riddles[randomIndex];
  }, [riddles]);

  return {
    riddles,
    isLoading,
    error,
    fetchRiddles,
    createRiddle,
    deleteRiddle,
    getRandomRiddle,
  };
};
