import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from '@/components/Sidebar'
import { useAppStore } from '@/stores/useAppStore'
export function AppLayout() { const location = useLocation(); const theme = useAppStore((s) => s.theme); return <div className={`app-shell ${theme}`}><Sidebar /><main className="main-content"><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .25 }}><Outlet /></motion.div></AnimatePresence></main></div> }
