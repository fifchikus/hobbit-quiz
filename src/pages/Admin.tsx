import { useState, useEffect } from 'react';
import { Loader2, Edit2, Trash2, LogOut } from 'lucide-react';
import { HobbitQuizEvent } from '@/types/admin';
import {
  fetchAdminEvents,
  updateAdminEvent,
  deleteAdminEvent,
  storeAdminCredentials,
  clearAdminCredentials,
  isAdminAuthenticated,
  getAdminApiBase,
} from '@/lib/adminApi';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [events, setEvents] = useState<HobbitQuizEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<HobbitQuizEvent | null>(null);
  const [editHobbitName, setEditHobbitName] = useState('');
  const [editEventType, setEditEventType] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    if (isAdminAuthenticated()) {
      setIsAuthenticated(true);
      loadEvents();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password && !token) {
      toast({
        title: 'Error',
        description: 'Please enter password or token',
        variant: 'destructive',
      });
      return;
    }

    storeAdminCredentials(password, token || undefined);
    setIsAuthenticated(true);
    setPassword('');
    setToken('');
    await loadEvents();
  };

  const handleLogout = () => {
    clearAdminCredentials();
    setIsAuthenticated(false);
    setEvents([]);
  };

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminEvents();
      setEvents(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load events';
      setError(message);
      if (message.includes('Unauthorized')) {
        setIsAuthenticated(false);
        clearAdminCredentials();
      }
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: HobbitQuizEvent) => {
    setEditingEvent(event);
    setEditHobbitName(event.hobbit_name);
    setEditEventType(event.event_type);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingEvent) return;

    const updates: { hobbitName?: string; eventType?: string } = {};
    if (editHobbitName !== editingEvent.hobbit_name) {
      updates.hobbitName = editHobbitName;
    }
    if (editEventType !== editingEvent.event_type) {
      updates.eventType = editEventType;
    }

    if (Object.keys(updates).length === 0) {
      setIsEditDialogOpen(false);
      return;
    }

    try {
      const updated = await updateAdminEvent(editingEvent.id, updates);
      setEvents(events.map(e => (e.id === updated.id ? updated : e)));
      setIsEditDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Event updated successfully',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update event';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      if (message.includes('Unauthorized') || message.includes('401')) {
        setIsAuthenticated(false);
        clearAdminCredentials();
        toast({
          title: 'Session Expired',
          description: 'Please log in again',
          variant: 'destructive',
        });
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await deleteAdminEvent(id);
      setEvents(events.filter(e => e.id !== id));
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete event';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      if (message.includes('Unauthorized') || message.includes('401')) {
        setIsAuthenticated(false);
        clearAdminCredentials();
        toast({
          title: 'Session Expired',
          description: 'Please log in again',
          variant: 'destructive',
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('uk-UA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md parchment-card rounded-xl p-8">
          <h1 className="text-2xl font-display text-muted-foreground mb-6 text-center font-semibold">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="token">Admin Token (optional)</Label>
              <Input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter admin token (optional)"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-display text-muted-foreground mb-2 font-semibold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage Hobbit Quiz Events</p>
            <p className="text-xs text-muted-foreground/70 mt-1 font-mono">
              Connected to {getAdminApiBase()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadEvents} variant="outline" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Refresh
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 border border-destructive rounded-lg text-muted-foreground">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && events.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          /* Events table */
          <div className="parchment-card rounded-xl p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-semibold">ID</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Player ID</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Hobbit Name</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Event Type</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Event Timestamp</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Created At</th>
                  <th className="text-left p-3 text-muted-foreground font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-muted-foreground">
                      No events found
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="border-b border-border/50 hover:bg-card/50">
                      <td className="p-3 text-muted-foreground">{event.id}</td>
                      <td className="p-3 text-muted-foreground font-mono text-sm">{event.player_id}</td>
                      <td className="p-3 text-muted-foreground">{event.hobbit_name}</td>
                      <td className="p-3 text-muted-foreground">{event.event_type}</td>
                      <td className="p-3 text-muted-foreground text-sm">{formatDate(event.event_timestamp)}</td>
                      <td className="p-3 text-muted-foreground text-sm">{formatDate(event.created_at)}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(event)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(event.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-hobbit-name">Hobbit Name</Label>
                <Input
                  id="edit-hobbit-name"
                  value={editHobbitName}
                  onChange={(e) => setEditHobbitName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edit-event-type">Event Type</Label>
                <Input
                  id="edit-event-type"
                  value={editEventType}
                  onChange={(e) => setEditEventType(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
