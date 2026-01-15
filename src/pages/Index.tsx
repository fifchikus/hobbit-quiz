import { useState, useEffect, useCallback } from 'react';
import { useHeight } from '@/hooks/useHeight';
import { PlayerView } from '@/components/PlayerView';
import { VictoryScreen } from '@/components/VictoryScreen';
import { HobbitNameDialog } from '@/components/HobbitNameDialog';
import { Riddle } from '@/types/riddle';
import { getRandomRiddle, MAX_HEIGHT, TOTAL_RIDDLES } from '@/data/riddles';
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
  }, [currentRiddle, answeredIds, height]);

  // Save answered IDs to localStorage
  useEffect(() => {
    localStorage.setItem('hobbit-answered-riddles', JSON.stringify(answeredIds));
  }, [answeredIds]);

  // Send game start data to webhook when hobbit name is set (only once per playerId)
  useEffect(() => {
    if (hobbitName && playerId && !hasSentStartData) {
      const sendStartData = async () => {
        try {
          const startData = {
            playerId,
            hobbitName,
            timestamp: new Date().toISOString(),
            eventType: 'game_start',
          };

          await fetch('https://evgen.pp.ua/webhook/hobbit-quiz', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(startData),
          });
          setHasSentStartData(true);
        } catch (error) {
          // Silently fail - don't interrupt user experience
          console.error('Failed to send start data:', error);
        }
      };

      sendStartData();
    }
  }, [hobbitName, playerId, hasSentStartData]);

  const handleCorrectAnswer = () => {
    if (currentRiddle && height < MAX_HEIGHT) {
      grow();
      setAnsweredIds(prev => [...prev, currentRiddle.id]);
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