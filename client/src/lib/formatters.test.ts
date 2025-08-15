import { describe, expect, it } from 'vitest';
import { formatDb, formatLufs, formatTime, formatBytes } from './formatters';

describe('formatters', () => {
  it('formats decibels', () => {
    expect(formatDb(-1)).toBe('-1.0 dB');
  });

  it('formats lufs', () => {
    expect(formatLufs(-14.356)).toBe('-14.4 LUFS');
  });

  it('formats time', () => {
    expect(formatTime(125)).toBe('02:05');
  });

  it('formats bytes', () => {
    expect(formatBytes(1024)).toBe('1.0 KB');
  });
});
