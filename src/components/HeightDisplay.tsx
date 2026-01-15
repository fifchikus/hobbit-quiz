import { MAX_HEIGHT } from '@/data/riddles';

interface HeightDisplayProps {
  height: number;
  isGrowing: boolean;
  hobbitName: string;
}

export const HeightDisplay = ({ height, isGrowing, hobbitName }: HeightDisplayProps) => {
  const progress = ((height - 100) / (MAX_HEIGHT - 100)) * 100;

  return (
    <div className="text-center mb-8">
      {hobbitName ? (
        <>
          <p className="text-foreground/70 text-lg sm:text-xl font-semibold mb-3">
            Зріст {hobbitName}: {height} см
          </p>
          <div className="height-display">
            <span className={`height-number ${isGrowing ? 'growing' : ''}`}>
              {height}
            </span>
            <span className="text-3xl sm:text-4xl text-accent/70 ml-2">см</span>
          </div>
        </>
      ) : (
        <>
          <p className="text-foreground/70 text-base sm:text-lg uppercase tracking-widest mb-3">
            Твій хобітський зріст
          </p>
          <div className="height-display">
            <span className={`height-number ${isGrowing ? 'growing' : ''}`}>
              {height}
            </span>
            <span className="text-3xl sm:text-4xl text-accent/70 ml-2">см</span>
          </div>
        </>
      )}
      
      {/* Progress bar */}
      <div className="mt-4 max-w-xs mx-auto">
        <div className="h-2 bg-card rounded-full overflow-hidden border border-border">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-foreground/50 text-sm mt-2">
          До максимуму: {MAX_HEIGHT - height} см
        </p>
      </div>

      <p className="text-foreground/50 text-sm sm:text-base mt-3 italic">
        {height < 105 
          ? "Скромний початок подорожі..."
          : height < 110 
          ? "Мудрішаєш з кожною відповіддю!"
          : height < 115
          ? "Справжній кмітливий хобіт!"
          : height < 120
          ? "Велетень серед хобітів! Ще трохи..."
          : "Ти найвищий хобіт у Ширі! 🌟"}
      </p>
    </div>
  );
};