import { Loader2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const DeleteConfirmModal = ({ onConfirm, onCancel, isLoading }: DeleteConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="parchment-card rounded-xl p-6 w-full max-w-md animate-fade-in-up">
        <h3 className="font-display text-xl text-muted-foreground mb-4 text-center">
          Delete Riddle?
        </h3>
        
        <p className="text-muted-foreground/80 text-center mb-6">
          Are you sure you want to remove this riddle from the archives? This cannot be undone.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-lg border-2 border-border text-muted-foreground hover:bg-card/50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-6 py-3 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
