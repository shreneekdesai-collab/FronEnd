import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'
export function Surface({ children, className = '', hover = false }: PropsWithChildren<{ className?: string; hover?: boolean }>) { return <motion.section className={`surface ${className}`} whileHover={hover ? { y: -3, transition: { duration: .2 } } : undefined}>{children}</motion.section> }
