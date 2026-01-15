import { useState, useEffect } from 'react';
import { Riddle } from '@/types/riddle';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getRandomCorrectMessage, getRandomIncorrectMessage } from '@/data/humorousMessages';

interface RiddleCardProps {
  riddle: Riddle | null;
  onCorrectAnswer: () => void;
  onNextRiddle: () => void;
  isLoading: boolean;
}

export const RiddleCard = ({ riddle, onCorrectAnswer, onNextRiddle, isLoading }: RiddleCardProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    setSelectedIndex(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setFeedbackMessage('');
  }, [riddle]);

  const handleAnswer = (index: number) => {
    if (isAnswered || !riddle) return;

    setSelectedIndex(index);
    setIsAnswered(true);
    
    const correct = index === riddle.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      const message = getRandomCorrectMessage();
      setFeedbackMessage(message);
      onCorrectAnswer();
      
      toast({
        title: "🌳 +1 см! Правильно!",
        description: message,
        duration: 5000,
      });
    } else {
      const message = getRandomIncorrectMessage();
      setFeedbackMessage(message);
      
      toast({
        title: "😅 Ой-ой...",
        description: message,
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  const handleNext = () => {
    onNextRiddle();
  };

  if (isLoading) {
    return (
      <div className="parchment-card rounded-xl p-8 rune-border">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!riddle) {
    return (
      <div className="parchment-card rounded-xl p-8 rune-border">
        <div className="text-center h-64 flex flex-col items-center justify-center">
          <p className="text-muted-foreground text-xl sm:text-2xl mb-4">Загадки завантажуються...</p>
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="parchment-card rounded-xl p-6 sm:p-8 rune-border animate-fade-in-up">
      {/* Question */}
      <div className="mb-8">
        <p className="text-muted-foreground text-xl sm:text-2xl leading-relaxed text-center font-display">
          "{riddle.question}"
        </p>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {riddle.options.map((option, index) => {
          let buttonClass = 'answer-button text-base sm:text-lg';
          
          if (isAnswered) {
            if (index === riddle.correctIndex) {
              buttonClass += ' correct';
            } else if (index === selectedIndex) {
              buttonClass += ' incorrect';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <span className="text-accent/80 font-semibold mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className="text-center animate-fade-in-up">
          <p className={`text-lg sm:text-xl mb-4 italic ${isCorrect ? 'text-primary' : 'text-destructive'}`}>
            {feedbackMessage}
          </p>
          <button
            onClick={handleNext}
            className="shire-button text-lg"
          >
            Наступна загадка
          </button>
        </div>
      )}
    </div>
  );
};