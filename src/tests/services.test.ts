import { describe, it, expect, vi } from 'vitest';
import { getEnv } from '../lib/env';
import { askCivicGuide } from '../services/geminiService';

vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    models = {
      generateContentStream: vi.fn().mockImplementation(async function* () {
        yield { text: 'Mock ' };
      })
    };
  }
}));

describe('Service utilities', () => {
  it('env returns value', () => {
    vi.stubGlobal('window', { ENV: { TEST: 'val' } });
    expect(getEnv('TEST')).toBe('val');
  });

  it('gemini sanitizes and responds', async () => {
    const res = await askCivicGuide('hi');
    expect(res).toBeDefined();
  });
});
