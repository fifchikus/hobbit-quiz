/**
 * n8n webhook API client for Hobbit Quiz events
 * All functions handle errors gracefully and never throw in a way that would crash the app
 */

const N8N_BASE = 'https://evgen.pp.ua/webhook';

export interface GameEvent {
  playerId: string;
  hobbitName: string;
  timestamp: string; // ISO string
  eventType: 'game_start' | 'answer' | 'game_finish' | string;
}

export interface UpdateEventPayload {
  id: number;
  hobbitName?: string;
  eventType?: string;
  timestamp?: string;
}

/**
 * Log a game event to n8n + Postgres
 * POST /hobbit-quiz/events
 */
export async function logEvent(event: GameEvent): Promise<Response | null> {
  try {
    const response = await fetch(`${N8N_BASE}/hobbit-quiz/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error(`Failed to log event: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Failed to log event:', error);
    return null;
  }
}

/**
 * Fetch events from n8n + Postgres
 * GET /hobbit-quiz/events?playerId=... (optional)
 */
export async function fetchEvents(playerId?: string): Promise<any[] | null> {
  try {
    const url = new URL(`${N8N_BASE}/hobbit-quiz/events`);
    if (playerId) {
      url.searchParams.set('playerId', playerId);
    }

    const res = await fetch(url.toString());
    
    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return null;
  }
}

/**
 * Update a single event in Postgres by id
 * PATCH /hobbit-quiz/events/update
 */
export async function updateEvent(payload: UpdateEventPayload): Promise<Response | null> {
  try {
    const response = await fetch(`${N8N_BASE}/hobbit-quiz/events/update`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Failed to update event:', error);
    return null;
  }
}

/**
 * Delete all events for a specific player
 * DELETE /hobbit-quiz/events/delete?playerId=...
 */
export async function deleteEventsByPlayer(playerId: string): Promise<Response | null> {
  try {
    const url = new URL(`${N8N_BASE}/hobbit-quiz/events/delete`);
    url.searchParams.set('playerId', playerId);

    const response = await fetch(url.toString(), {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete events: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Failed to delete events:', error);
    return null;
  }
}
