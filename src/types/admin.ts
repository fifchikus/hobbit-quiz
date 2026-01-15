/**
 * Types for admin panel
 */

export interface HobbitQuizEvent {
  id: number;
  player_id: string;
  hobbit_name: string;
  event_type: string;
  event_timestamp: string;
  created_at: string;
}

export interface AdminCredentials {
  password: string;
  token?: string;
}

export interface UpdateEventPayload {
  hobbitName?: string;
  eventType?: string;
}
