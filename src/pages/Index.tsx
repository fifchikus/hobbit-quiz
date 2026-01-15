import { useState, useEffect, useCallback } from 'react';
import { useHeight } from '@/hooks/useHeight';
import { PlayerView } from '@/components/PlayerView';
import { VictoryScreen } from '@/components/VictoryScreen';
import { HobbitNameDialog } from '@/components/HobbitNameDialog';
import { Riddle } from '@/types/riddle';
import { getRandomRiddle, MAX_HEIGHT, TOTAL_RIDDLES } from '@/data/riddles';
import { logEvent, fetchEvents, updateEvent, deleteEventsByPlayer } from '@/lib/api';
import shireBackground from '@/assets/shire-background.jpg';

// Generate unique player ID
const generatePlayerId = (): string => {
  return `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const Index = () => {
  const { height, isGrowing, grow, reset: resetHeight } = useHeight();
  const [currentRiddle, setCurrentRiddle] = useState<Riddle | null>(null);
  const [answeredIds, setAnsweredIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('hobbit-answered-riddles');
    return saved ? JSON.parse(saved) : [];
  });
  const [isComplete, setIsComplete] = useState(false);
  const [hobbitName, setHobbitName] = useState<string | null>(() => {
    return localStorage.getItem('hobbit-name');
  });
  const [playerId, setPlayerId] = useState<string | null>(() => {
    return localStorage.getItem('hobbit-player-id');
  });
  const [showNameDialog, setShowNameDialog] = useState(!hobbitName);
  const [hasSentStartData, setHasSentStartData] = useState(false);

  useEffect(() => {
    // Check if game is complete
    if (height >= MAX_HEIGHT || answeredIds.length >= TOTAL_RIDDLES) {
      setIsComplete(true);
      // Fetch events when game finishes (dev/debugging)
      if (playerId && process.env.NODE_ENV === 'development') {
        fetchEvents(playerId).then(events => {
          console.log('Game finished. Player events:', events);
        });
      }
      return;
    }

    if (!currentRiddle) {
      const riddle = getRandomRiddle(answeredIds);
      if (riddle) {
        setCurrentRiddle(riddle);
      } else {
        setIsComplete(true);
      }
    }
  }, [currentRiddle, answeredIds, height, playerId]);

  // Save answered IDs to localStorage
  useEffect(() => {
    localStorage.setItem('hobbit-answered-riddles', JSON.stringify(answeredIds));
  }, [answeredIds]);

  // Send game start data to webhook when hobbit name is set (only once per playerId)
  useEffect(() => {
    if (hobbitName && playerId && !hasSentStartData) {
      const sendStartData = async () => {
        await logEvent({
          playerId,
          hobbitName,
          timestamp: new Date().toISOString(),
          eventType: 'game_start',
        });
        setHasSentStartData(true);
      };

      sendStartData();
    }
  }, [hobbitName, playerId, hasSentStartData]);

  const handleCorrectAnswer = async () => {
    if (currentRiddle && height < MAX_HEIGHT) {
      grow();
      setAnsweredIds(prev => [...prev, currentRiddle.id]);
      
      // Log answer event
      if (hobbitName && playerId) {
        await logEvent({
          playerId,
          hobbitName,
          timestamp: new Date().toISOString(),
          eventType: 'answer',
        });
      }
    }
  };

  const handleNextRiddle = () => {
    if (height >= MAX_HEIGHT || answeredIds.length >= TOTAL_RIDDLES) {
      setIsComplete(true);
      return;
    }
    
    const nextRiddle = getRandomRiddle(answeredIds);
    if (nextRiddle) {
      setCurrentRiddle(nextRiddle);
    } else {
      setIsComplete(true);
    }
  };

  const handleNameSet = (name: string) => {
    const newPlayerId = generatePlayerId();
    setHobbitName(name);
    setPlayerId(newPlayerId);
    setHasSentStartData(false); // Reset flag for new game
    localStorage.setItem('hobbit-name', name);
    localStorage.setItem('hobbit-player-id', newPlayerId);
    setShowNameDialog(false);
  };

  const handleRestart = () => {
    setAnsweredIds([]);
    setIsComplete(false);
    setCurrentRiddle(null);
    resetHeight();
    localStorage.removeItem('hobbit-answered-riddles');
    // Generate new player ID for new game
    const newPlayerId = generatePlayerId();
    setPlayerId(newPlayerId);
    setHasSentStartData(false); // Reset flag for new game
    localStorage.setItem('hobbit-player-id', newPlayerId);
  };

  // Dev-only functions for testing webhooks
  const handleLoadEvents = async () => {
    if (!playerId) {
      console.log('No playerId available');
      return;
    }
    const events = await fetchEvents(playerId);
    console.log('Loaded events:', events);
  };

  const handleDeleteEvents = async () => {
    if (!playerId) {
      console.log('No playerId available');
      return;
    }
    const result = await deleteEventsByPlayer(playerId);
    if (result) {
      console.log('Events deleted successfully');
    }
  };

  const handleUpdateEvent = async () => {
    const result = await updateEvent({ id: 1, eventType: 'patched' });
    if (result) {
      console.log('Event updated successfully');
    }
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${shireBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />

      {/* Main Content */}
      <main className="relative z-10 container max-w-2xl mx-auto px-4 py-8 pb-16 min-h-screen flex flex-col justify-center">
        {showNameDialog ? (
          <HobbitNameDialog onNameSet={handleNameSet} />
        ) : isComplete ? (
          <VictoryScreen height={height} onRestart={handleRestart} />
        ) : (
          <PlayerView
            riddle={currentRiddle}
            height={height}
            isGrowing={isGrowing}
            isLoading={false}
            onCorrectAnswer={handleCorrectAnswer}
            onNextRiddle={handleNextRiddle}
            answeredCount={answeredIds.length}
            totalRiddles={TOTAL_RIDDLES}
            hobbitName={hobbitName || ''}
          />
        )}
      </main>

      {/* Dev-only section for testing webhooks */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-16 left-4 z-20 flex flex-col gap-2">
          <button
            onClick={handleLoadEvents}
            className="px-3 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded border border-secondary hover:bg-secondary/70"
          >
            Load my events (GET)
          </button>
          <button
            onClick={handleDeleteEvents}
            className="px-3 py-1 text-xs bg-destructive/50 text-destructive-foreground rounded border border-destructive hover:bg-destructive/70"
          >
            Delete my events (DELETE)
          </button>
          <button
            onClick={handleUpdateEvent}
            className="px-3 py-1 text-xs bg-primary/50 text-primary-foreground rounded border border-primary hover:bg-primary/70"
          >
            Update event #1 (PATCH)
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 text-center py-4 z-10">
        <p className="text-foreground/40 text-xs">
          ᛭ Гра-загадка з Ширу ᛭
        </p>
      </footer>
    </div>
  );
};

export default Index;