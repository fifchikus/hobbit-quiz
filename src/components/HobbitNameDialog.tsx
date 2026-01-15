import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface HobbitNameDialogProps {
  onNameSet: (name: string) => void;
}

export const HobbitNameDialog = ({ onNameSet }: HobbitNameDialogProps) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    
    // Small delay for UX
    setTimeout(() => {
      setIsLoading(false);
      onNameSet(name.trim());
    }, 300);
  };

  return (
    <div className="login-overlay fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-10 text-primary">❧</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10 text-primary rotate-180">❧</div>
      </div>

      <div className="parchment-card rounded-xl p-8 w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-muted-foreground mb-2">
            Ласкаво просимо до Ширу!
          </h1>
          <p className="text-muted-foreground text-sm">
            Як тебе звати, маленький хобіте?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-muted-foreground text-sm font-semibold mb-2">
              Твоє ім'я
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card/50 border-2 border-border text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
              placeholder="Більбо"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="shire-button w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Починаємо...
              </>
            ) : (
              'Почати подорож'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-foreground/60 text-xs italic">
            "Не всі мандрівники заблукали"
          </p>
        </div>
      </div>
    </div>
  );
};
