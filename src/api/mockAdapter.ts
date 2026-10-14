import type { ApiClient, ChatResult, Conversation, Document, Event, Stats, Summary, User } from './types'

const wait = (min = 300, max = 900) => new Promise<void>((resolve) => setTimeout(resolve, min + Math.random() * (max - min)))
const user: User = { id: 'u_01', name: 'Alex Morgan', email: 'alex@memorynest.app' }
let docs: Document[] = [
  { id: 'doc_01', filename: 'Q4 Product Strategy.pdf', type: 'PDF', size: '2.4 MB', chunks: 42, status: 'indexed', created_at: '2024-12-06' },
  { id: 'doc_02', filename: 'Personal North Star.txt', type: 'TXT', size: '18 KB', chunks: 8, status: 'indexed', created_at: '2024-12-03' },
  { id: 'doc_03', filename: 'Research notes.docx', type: 'DOCX', size: '840 KB', chunks: 23, status: 'indexed', created_at: '2024-11-28' },
]
const events: Event[] = [
  { id: 'evt_01', title: 'Submit annual review', date: '2025-01-14', time: '09:00', status: 'extracted', source: 'Q4 Product Strategy.pdf', description: 'Final review feedback is due.' },
  { id: 'evt_02', title: 'Design critique', date: '2025-01-16', time: '14:30', status: 'confirmed', source: 'Research notes.docx', description: 'Bring the latest interaction studies.' },
  { id: 'evt_03', title: 'Renew studio lease', date: '2025-01-18', time: '12:00', status: 'extracted', source: 'Personal North Star.txt', description: 'Decision window closes this week.' },
]
const stats: Stats = { documents: 12, chunks: 486, summaries: 8, conversations: 24 }
const conversations: Conversation[] = [
  { id: 'c1', title: 'Launch planning', updated_at: 'Today, 10:42', preview: 'What are the three risks we called out?' },
  { id: 'c2', title: 'The North Star', updated_at: 'Yesterday', preview: 'Summarize my principles for the new year.' },
  { id: 'c3', title: 'Research synthesis', updated_at: 'Dec 04', preview: 'Where did we discuss activation loops?' },
]

export const mockAdapter: ApiClient = {
  async register(name, email) { await wait(); return { ...user, name, email } },
  async login() { await wait(); return user },
  async logout() { await wait(100, 200) },
  async me() { await wait(); return user },
  async stats() { await wait(); return stats },
  async documents() { await wait(); return docs },
  async upload(file, onProgress) {
    await wait(250, 500)
    const id = `doc_${Date.now()}`
    for (const value of [12, 29, 51, 74, 92, 100]) { await new Promise((r) => setTimeout(r, 220)); onProgress?.(value) }
    const document: Document = { id, filename: file.name, type: file.name.split('.').pop()?.toUpperCase() || 'FILE', size: `${Math.max(1, Math.round(file.size / 1024))} KB`, chunks: 31, status: 'indexed', created_at: new Date().toISOString().slice(0, 10) }
    docs = [document, ...docs]
    return document
  },
  async deleteDocument(id) { await wait(200, 400); docs = docs.filter((doc) => doc.id !== id) },
  async chat(question, onToken) {
    await wait(350, 650)
    const found = !/unknown|unfound|purple elephant/i.test(question)
    const answer = found ? 'Your notes point to a simple pattern: protect deep work in the morning, make decisions visible, and revisit the plan every Friday. The strongest signal is consistency over intensity.' : "I couldn't find this information in your stored documents."
    for (const token of answer.split(' ')) { await new Promise((r) => setTimeout(r, 28)); onToken?.(`${token} `) }
    return { answer, found, sources: found ? [{ document_id: 'doc_01', filename: 'Q4 Product Strategy.pdf', chunk_index: 12, score: 0.94, snippet: 'Consistency compounds when the system makes the right action easy.' }, { document_id: 'doc_02', filename: 'Personal North Star.txt', chunk_index: 3, score: 0.87, snippet: 'Small rituals create room for meaningful work.' }] : [] }
  },
  async conversations() { await wait(); return conversations },
  async summaries() { await wait(); return [{ id: 'sum_01', document_id: 'doc_01', filename: 'Q4 Product Strategy.pdf', title: 'Q4 Product Strategy', body: 'A clear synthesis of priorities, risks, and the operating cadence for the next quarter. The team is optimizing for durable activation through a tighter first-run experience and a calmer roadmap.', status: 'ready', created_at: 'Dec 06' }] },
  async createSummary(documentId) { await wait(700, 1100); const doc = docs.find((item) => item.id === documentId) || docs[0]; return { id: `sum_${Date.now()}`, document_id: doc.id, filename: doc.filename, title: doc.filename.replace(/\.[^.]+$/, ''), body: 'This generated summary maps the key ideas, open questions, and decisions in your document. It connects the context across sections so you can move from reading to remembering with less effort.', status: 'ready', created_at: 'Just now' } },
  async events() { await wait(); return events },
  async confirmEvent(id) { await wait(200, 400); const event = events.find((item) => item.id === id)!; event.status = 'confirmed'; return event },
  async dismissEvent(id) { await wait(200, 400); const event = events.find((item) => item.id === id)!; event.status = 'dismissed'; return event },
  async checkReminders() { await wait(500, 800); return { sent: events.filter((event) => event.status === 'confirmed'), failed: [] } },
}
