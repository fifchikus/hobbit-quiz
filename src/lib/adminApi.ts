/**
 * Admin API client with authentication
 * Automatically includes credentials in all requests
 */

import { HobbitQuizEvent, UpdateEventPayload } from '@/types/admin';

// Use environment variable or fallback to production URL
const ADMIN_API_BASE = import.meta.env.VITE_ADMIN_API_BASE_URL || 'https://evgen.pp.ua/api/admin';

/**
 * Get stored admin credentials from localStorage
 */
function getAdminCredentials(): { password?: string; token?: string } | null {
  const stored = localStorage.getItem('admin-credentials');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Create headers with admin authentication
 */
function createAuthHeaders(): HeadersInit {
  const credentials = getAdminCredentials();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (credentials) {
    if (credentials.password) {
      // Basic Auth: admin:password
      const auth = btoa(`admin:${credentials.password}`);
      headers['Authorization'] = `Basic ${auth}`;
    }
    
    if (credentials.token) {
      headers['x-admin-token'] = credentials.token;
    }
  }

  return headers;
}

/**
 * Fetch all events
 * GET /api/admin/events?playerId=... (optional)
 */
export async function fetchAdminEvents(playerId?: string): Promise<HobbitQuizEvent[]> {
  try {
    const url = new URL(`${ADMIN_API_BASE}/events`);
    if (playerId) {
      url.searchParams.set('playerId', playerId);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: createAuthHeaders(),
    });

    if (response.status === 401) {
      throw new Error('Unauthorized - please log in again');
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching admin events:', error);
    throw error;
  }
}

/**
 * Update an event
 * PATCH /api/admin/events/:id
 */
export async function updateAdminEvent(
  id: number,
  payload: UpdateEventPayload
): Promise<HobbitQuizEvent> {
  try {
    const response = await fetch(`${ADMIN_API_BASE}/events/${id}`, {
      method: 'PATCH',
      headers: createAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      throw new Error('Unauthorized - please log in again');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `Failed to update event: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating admin event:', error);
    throw error;
  }
}

/**
 * Delete an event
 * DELETE /api/admin/events/:id
 */
export async function deleteAdminEvent(id: number): Promise<void> {
  try {
    const response = await fetch(`${ADMIN_API_BASE}/events/${id}`, {
      method: 'DELETE',
      headers: createAuthHeaders(),
    });

    if (response.status === 401) {
      throw new Error('Unauthorized - please log in again');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `Failed to delete event: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting admin event:', error);
    throw error;
  }
}

/**
 * Store admin credentials in localStorage
 */
export function storeAdminCredentials(password: string, token?: string): void {
  localStorage.setItem('admin-credentials', JSON.stringify({ password, token }));
}

/**
 * Clear admin credentials
 */
export function clearAdminCredentials(): void {
  localStorage.removeItem('admin-credentials');
}

/**
 * Check if admin is authenticated
 */
export function isAdminAuthenticated(): boolean {
  return getAdminCredentials() !== null;
}

/**
 * Get the API base URL (for debugging/display)
 */
export function getAdminApiBase(): string {
  return ADMIN_API_BASE;
}
