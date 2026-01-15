import { useState } from 'react';
import { CreateRiddlePayload } from '@/types/riddle';
import { Loader2, X } from 'lucide-react';

interface AddRiddleFormProps {
  onSave: (payload: CreateRiddlePayload) => Promise<boolean>;
  onCancel: () => void;
  isLoading: boolean;
}

export const AddRiddleForm = ({ onSave, onCancel, isLoading }: AddRiddleFormProps) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question || options.some(opt => !opt)) {
      return;
    }

    const success = await onSave({
      question,
      options: options as [string, string, string, string],
      correctIndex,
    });

    if (success) {
      onCancel();
    }
  };

  return (
    <div className="parchment-card rounded-xl p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl text-muted-foreground">Add New Riddle</h3>
        <button 
          onClick={onCancel}
          className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-muted-foreground text-sm font-semibold mb-2">
            Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-card/50 border-2 border-border text-muted-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent transition-colors resize-none"
            placeholder="What has roots as nobody sees..."
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((option, index) => (
            <div key={index}>
              <label className="block text-muted-foreground text-sm font-semibold mb-2">
                Option {index + 1}
              </label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-card/50 border-2 border-border text-muted-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                placeholder={`Answer ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-muted-foreground text-sm font-semibold mb-2">
            Correct Option
          </label>
          <select
            value={correctIndex}
            onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
            className="w-full px-4 py-2 rounded-lg bg-card/50 border-2 border-border text-muted-foreground focus:outline-none focus:border-accent transition-colors"
          >
            {options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="shire-button flex-1 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Riddle'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg border-2 border-border text-muted-foreground hover:bg-card/50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
