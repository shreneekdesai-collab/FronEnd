import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppLayout } from '@/layouts/AppLayout'
import { Landing } from '@/pages/Landing'
import { Auth } from '@/pages/Auth'
import { Dashboard } from '@/pages/Dashboard'
import { Chat } from '@/pages/Chat'
import { Documents } from '@/pages/Documents'
import { Upload } from '@/pages/Upload'
import { Summaries } from '@/pages/Summaries'
import { Reminders } from '@/pages/Reminders'
import { History } from '@/pages/History'
import { Settings } from '@/pages/Settings'
import './styles.css'

const client = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } } })
function App() { return <QueryClientProvider client={client}><BrowserRouter><Routes><Route path="/" element={<Landing />} /><Route path="/login" element={<Auth />} /><Route path="/register" element={<Auth register />} /><Route path="/app" element={<AppLayout />}><Route index element={<Dashboard />} /><Route path="chat" element={<Chat />} /><Route path="documents" element={<Documents />} /><Route path="upload" element={<Upload />} /><Route path="summaries" element={<Summaries />} /><Route path="reminders" element={<Reminders />} /><Route path="history" element={<History />} /><Route path="settings" element={<Settings />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes></BrowserRouter></QueryClientProvider> }
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
