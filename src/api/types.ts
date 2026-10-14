export type UploadStage = 'validating' | 'extracting' | 'ocr' | 'chunking' | 'embedding' | 'indexed' | 'failed'
export type EventStatus = 'extracted' | 'confirmed' | 'sent' | 'dismissed'

export interface User { id: string; name: string; email: string }
export interface Source { document_id: string; filename: string; chunk_index: number; score: number; snippet: string }
export interface Document { id: string; filename: string; type: string; size: string; chunks: number; status: UploadStage; created_at: string }
export interface Stats { documents: number; chunks: number; summaries: number; conversations: number }
export interface Conversation { id: string; title: string; updated_at: string; preview: string }
export interface Event { id: string; title: string; date: string; time: string; status: EventStatus; source: string; description: string }
export interface Summary { id: string; document_id: string; filename: string; title: string; body: string; status: 'ready' | 'generating'; created_at: string }
export interface ChatResult { answer: string; sources: Source[]; found: boolean }

export interface ApiClient {
  register(name: string, email: string, password: string): Promise<User>
  login(email: string, password: string): Promise<User>
  logout(): Promise<void>
  me(): Promise<User>
  stats(): Promise<Stats>
  documents(): Promise<Document[]>
  upload(file: File, onProgress?: (value: number) => void): Promise<Document>
  deleteDocument(id: string): Promise<void>
  chat(question: string, onToken?: (token: string) => void): Promise<ChatResult>
  conversations(): Promise<Conversation[]>
  summaries(): Promise<Summary[]>
  createSummary(documentId: string): Promise<Summary>
  events(): Promise<Event[]>
  confirmEvent(id: string): Promise<Event>
  dismissEvent(id: string): Promise<Event>
  checkReminders(): Promise<{ sent: Event[]; failed: Event[] }>
}
