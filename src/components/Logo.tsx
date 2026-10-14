import { motion } from 'framer-motion'
export function Logo() { return <div className="brand"><motion.span className="brand-mark" animate={{ rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 8 }}><span /></motion.span><span>memory<span className="gradient-text">nest</span></span></div> }
