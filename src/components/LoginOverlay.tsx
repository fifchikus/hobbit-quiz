import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoginOverlayProps {
  onLogin: (username: string, password: string) => void;
  onSuccess: () => void;
}

export const LoginOverlay = ({ onLogin, onSuccess }: LoginOverlayProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);
    
    // Store credentials and trigger success
    onLogin(username, password);
    
    // Small delay for UX
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 500);
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
            Welcome, Traveler
          </h1>
          <p className="text-muted-foreground/80 text-sm">
            Enter your credentials to enter the Shire
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-muted-foreground text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card/50 border-2 border-border text-muted-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
              placeholder="Bilbo Baggins"
              required
            />
          </div>

          <div>
            <label className="block text-muted-foreground text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-card/50 border-2 border-border text-muted-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="shire-button w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Entering...
              </>
            ) : (
              'Enter the Shire'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground/60 text-xs italic">
            "Not all those who wander are lost"
          </p>
        </div>
      </div>
    </div>
  );
};
