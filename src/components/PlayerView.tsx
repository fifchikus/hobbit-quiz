import { Riddle } from '@/types/riddle';
import { HeightDisplay } from './HeightDisplay';
import { RiddleCard } from './RiddleCard';

interface PlayerViewProps {
  riddle: Riddle | null;
  height: number;
  isGrowing: boolean;
  isLoading: boolean;
  onCorrectAnswer: () => void;
  onNextRiddle: () => void;
  answeredCount: number;
  totalRiddles: number;
  hobbitName: string;
}

export const PlayerView = ({
  riddle,
  height,
  isGrowing,
  isLoading,
  onCorrectAnswer,
  onNextRiddle,
  answeredCount,
  totalRiddles,
  hobbitName,
}: PlayerViewProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-3 gold-shimmer animate-title-glow">
          Загадки Ширу
        </h1>
        <p className="text-lg sm:text-xl text-foreground/70 max-w-md mx-auto">
          Відповідай на загадки Середзем'я та рости із кожною правильною відповіддю!
        </p>
        <p className="text-sm text-foreground/50 mt-2">
          Загадок розгадано: {answeredCount} / {totalRiddles}
        </p>
      </div>

      {/* Height Display */}
      <HeightDisplay height={height} isGrowing={isGrowing} hobbitName={hobbitName} />

      {/* Riddle Card */}
      <RiddleCard
        riddle={riddle}
        onCorrectAnswer={onCorrectAnswer}
        onNextRiddle={onNextRiddle}
        isLoading={isLoading}
      />
    </div>
  );
};