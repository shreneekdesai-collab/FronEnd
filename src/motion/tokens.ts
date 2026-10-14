import type { Variants } from 'framer-motion'
export const spring = { type: 'spring', stiffness: 380, damping: 30 } as const
export const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: .45, ease: 'easeOut' } } }
export const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: .07 } } }
