# MemoryNest API Contract

All routes except authentication use `Authorization: Bearer <token>`. JSON responses use HTTP status `2xx` on success and `{ "detail": "..." }` on errors. Dates are ISO-8601 strings.

## Authentication

- `POST /auth/register` body `{ name, email, password }` -> `User` and bearer token
- `POST /auth/login` body `{ email, password }` -> `User` and bearer token
- `POST /auth/logout` -> `{ ok: true }`
- `GET /auth/me` -> `User`

## Dashboard and Documents

- `GET /dashboard/stats` -> `{ documents, chunks, summaries, conversations }`
- `POST /documents` multipart field `file` -> `Document`; accepted `pdf`, `docx`, `txt`, `png`, `jpg`, `jpeg`
- `GET /documents` -> `Document[]`
- `GET /documents/:id` -> `Document`
- `DELETE /documents/:id` -> `{ ok: true }` and cascades chunks/embeddings
- `GET /documents/:id/status` -> `{ stage: validating|extracting|ocr|chunking|embedding|indexed|failed, progress: number, error?: string }`

`Document` contains `{ id, filename, type, size, chunks, status, created_at }`.

## Chat

- `POST /chat` body `{ question, conversation_id?, document_ids? }`
- Response may be an SSE stream with `token` events followed by a `final` event:

```json
{ "answer": "...", "found": true, "sources": [{ "document_id": "...", "filename": "...", "chunk_index": 4, "score": 0.92, "snippet": "..." }] }
```

When retrieval is below the configured threshold, `found` is `false`, `answer` is exactly the not-found message, and `sources` is empty.

- `GET /conversations` -> `Conversation[]`
- `GET /conversations/:id` -> conversation with messages
- `DELETE /conversations/:id` -> `{ ok: true }`
- `GET /conversations/search?q=...` -> `Conversation[]`

## Summaries

- `POST /summaries` body `{ document_id }` -> `Summary` (generation may be asynchronous)
- `GET /summaries` -> `Summary[]`
- `GET /summaries/:id/audio` -> `audio/wav`

## Events and Reminders

- `POST /documents/:id/extract-events` -> `Event[]`
- `GET /events` -> `Event[]`
- `POST /events/:id/confirm` -> updated `Event` with `status: confirmed`
- `POST /events/:id/dismiss` -> updated `Event` with `status: dismissed`
- `POST /reminders/check` -> `{ sent: Event[], failed: Event[] }`
- `GET /events/export.ics` -> `text/calendar` download

`Event` contains `{ id, title, date, time, status, source, description }`; status is `extracted`, `confirmed`, `sent`, or `dismissed`.
