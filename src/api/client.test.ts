import { describe, expect, it } from 'vitest'
import { mockAdapter } from './mockAdapter'

describe('mock adapter', () => {
  it('returns no sources for a not-found answer', async () => {
    const result = await mockAdapter.chat('Tell me about the unknown purple elephant')
    expect(result.found).toBe(false)
    expect(result.sources).toEqual([])
  })

  it('streams a grounded answer and citations', async () => {
    let streamed = ''
    const result = await mockAdapter.chat('What should I focus on?', (token) => { streamed += token })
    expect(streamed).toContain('Your notes')
    expect(result.sources[0].score).toBeGreaterThan(0.8)
  })
})
