import { Riddle } from '@/types/riddle';
import { X, Check } from 'lucide-react';

interface RiddlePreviewModalProps {
  riddle: Riddle;
  onClose: () => void;
}

export const RiddlePreviewModal = ({ riddle, onClose }: RiddlePreviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="parchment-card rounded-xl p-6 w-full max-w-lg animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl text-muted-foreground">Riddle Preview</h3>
          <button 
            onClick={onClose}
            className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground text-lg leading-relaxed">
            {riddle.question}
          </p>
        </div>

        <div className="space-y-3">
          {riddle.options.map((option, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                index === riddle.correctIndex 
                  ? 'bg-primary/20 border-2 border-primary' 
                  : 'bg-card/30 border-2 border-border'
              }`}
            >
              <span className="text-accent font-semibold">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="text-muted-foreground flex-1">{option}</span>
              {index === riddle.correctIndex && (
                <Check className="w-5 h-5 text-primary" />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="shire-button w-full mt-6"
        >
          Close
        </button>
      </div>
    </div>
  );
};
