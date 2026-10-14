import { httpAdapter } from './httpAdapter'
import { mockAdapter } from './mockAdapter'
export * from './types'
export const api = import.meta.env.VITE_USE_MOCK !== 'false' ? mockAdapter : httpAdapter
