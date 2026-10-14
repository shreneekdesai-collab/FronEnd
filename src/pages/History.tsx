import { MessageSquare, Search, Trash2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import { Topbar } from '@/components/Topbar'
export function History() { const { data = [] } = useQuery({ queryKey: ['conversations'], queryFn: api.conversations }); return <><Topbar title="Conversation history" eyebrow="YOUR THREADS / 24 TOTAL" /><div className="toolbar"><div className="search-box"><Search size={16} /><input placeholder="Search conversations..." /></div></div><div className="history-list">{data.map((item) => <div className="history-row" key={item.id}><div className="history-icon"><MessageSquare size={18} /></div><div><h3>{item.title}</h3><p>{item.preview}</p></div><time>{item.updated_at}</time><button aria-label="Delete conversation"><Trash2 size={15} /></button></div>)}</div></> }
