import type { ApiClient } from './types'

const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const token = localStorage.getItem('memorynest-token')
  const response = await fetch(`${base}${path}`, { ...options, headers: { ...(options?.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
  if (!response.ok) throw new Error(await response.text())
  return response.json() as Promise<T>
}

export const httpAdapter: ApiClient = {
  register: (name, email, password) => request('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) }),
  login: (email, password) => request('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }),
  logout: () => request('/auth/logout', { method: 'POST' }).then(() => undefined),
  me: () => request('/auth/me'), stats: () => request('/dashboard/stats'), documents: () => request('/documents'),
  upload: (file) => { const form = new FormData(); form.append('file', file); return request('/documents', { method: 'POST', body: form }) },
  deleteDocument: (id) => request(`/documents/${id}`, { method: 'DELETE' }).then(() => undefined),
  chat: (question) => request('/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question }) }),
  conversations: () => request('/conversations'), summaries: () => request('/summaries'),
  createSummary: (document_id) => request('/summaries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ document_id }) }),
  events: () => request('/events'), confirmEvent: (id) => request(`/events/${id}/confirm`, { method: 'POST' }), dismissEvent: (id) => request(`/events/${id}/dismiss`, { method: 'POST' }), checkReminders: () => request('/reminders/check', { method: 'POST' }),
}
