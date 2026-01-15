import { useState } from 'react';
import { Riddle, CreateRiddlePayload } from '@/types/riddle';
import { AddRiddleForm } from './AddRiddleForm';
import { RiddlePreviewModal } from './RiddlePreviewModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { Plus, Trash2, Eye, Loader2 } from 'lucide-react';

interface AdminViewProps {
  riddles: Riddle[];
  isLoading: boolean;
  onCreateRiddle: (payload: CreateRiddlePayload) => Promise<boolean>;
  onDeleteRiddle: (id: string) => Promise<boolean>;
}

export const AdminView = ({ riddles, isLoading, onCreateRiddle, onDeleteRiddle }: AdminViewProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [previewRiddle, setPreviewRiddle] = useState<Riddle | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    await onDeleteRiddle(deleteId);
    setIsDeleting(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-foreground">
          Riddle Archives
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="shire-button flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Riddle
        </button>
      </div>

      {showAddForm && (
        <AddRiddleForm
          onSave={onCreateRiddle}
          onCancel={() => setShowAddForm(false)}
          isLoading={isLoading}
        />
      )}

      {isLoading && !riddles.length ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : riddles.length === 0 ? (
        <div className="parchment-card rounded-xl p-8 text-center">
          <p className="text-muted-foreground">
            No riddles in the archives yet. Add one to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {riddles.map((riddle) => (
            <div
              key={riddle.id}
              className="bg-card/50 border-2 border-border rounded-lg p-4 flex items-center gap-4 hover:border-accent/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-foreground truncate">
                  {riddle.question}
                </p>
                <p className="text-foreground/50 text-sm">
                  Answer: {riddle.options[riddle.correctIndex]}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewRiddle(riddle)}
                  className="p-2 rounded-lg hover:bg-primary/20 text-primary transition-colors"
                  title="Preview"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDeleteId(riddle.id)}
                  className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewRiddle && (
        <RiddlePreviewModal
          riddle={previewRiddle}
          onClose={() => setPreviewRiddle(null)}
        />
      )}

      {deleteId && (
        <DeleteConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};
