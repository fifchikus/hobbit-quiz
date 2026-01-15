import { Sparkles, RotateCcw, Cake } from 'lucide-react';

interface VictoryScreenProps {
  height: number;
  onRestart: () => void;
}

export const VictoryScreen = ({ height, onRestart }: VictoryScreenProps) => {
  return (
    <div className="parchment-card rounded-xl p-8 sm:p-12 text-center animate-fade-in-up">
      <div className="mb-6">
        <Sparkles className="w-16 h-16 mx-auto text-accent animate-float" />
      </div>
      
      <h1 className="text-3xl sm:text-4xl font-display text-muted-foreground mb-4">
        🎉 Вітаємо, найвищий хобіте! 🎉
      </h1>
      
      <div className="mb-6">
        <p className="text-7xl sm:text-8xl font-bold text-accent animate-float inline-block px-6 py-3 rounded-lg" style={{
          textShadow: '0 0 30px rgba(212, 179, 0, 0.8), 0 0 60px rgba(212, 179, 0, 0.4)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)'
        }}>
          {height} см
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-medium">
          Ти розв'язав усі загадки та став <span className="text-primary font-semibold">найвищим хобітом</span> у своєму сусідстві Ширу!
        </p>
        
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Cake className="w-6 h-6" />
          <span className="text-lg sm:text-xl font-semibold">Твоя нагорода:</span>
          <Cake className="w-6 h-6" />
        </div>

        <p className="text-lg sm:text-xl text-muted-foreground italic leading-relaxed">
          Смачний хобітський пиріг з яблуками та медом, велика кухоль ельфійського чаю, 
          та почесне місце за столом у Бег-Енді! 🥧🍵
        </p>

        <p className="text-base text-muted-foreground mt-4">
          А найголовніше — ти отримуєш склянку смачного соку з найкращих дерев від Ентів для подальшого росту... 
          якщо колись захочеш спробувати знову! 🌳
        </p>
      </div>

      <button
        onClick={onRestart}
        className="shire-button inline-flex items-center gap-2 text-lg"
      >
        <RotateCcw className="w-5 h-5" />
        Почати спочатку
      </button>
    </div>
  );
};