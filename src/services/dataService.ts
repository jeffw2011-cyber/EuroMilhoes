import { DrawResult } from '../types';

// Mock data representing recent EuroMillions draws
export const MOCK_HISTORY: DrawResult[] = [
  {
    id: '2024-018',
    date: '2024-03-01',
    numbers: [4, 7, 19, 20, 34],
    stars: [2, 11],
    jackpot: '€39,000,000'
  },
  {
    id: '2024-017',
    date: '2024-02-27',
    numbers: [10, 14, 25, 32, 39],
    stars: [7, 8],
    jackpot: '€26,000,000'
  },
  {
    id: '2024-016',
    date: '2024-02-23',
    numbers: [1, 8, 11, 25, 28],
    stars: [4, 6],
    jackpot: '€17,000,000'
  },
  {
    id: '2024-015',
    date: '2024-02-20',
    numbers: [23, 31, 37, 42, 48],
    stars: [3, 7],
    jackpot: '€73,000,000'
  },
  {
    id: '2024-014',
    date: '2024-02-16',
    numbers: [8, 13, 14, 24, 26],
    stars: [1, 2],
    jackpot: '€64,000,000'
  },
  {
    id: '2024-013',
    date: '2024-02-13',
    numbers: [13, 17, 18, 20, 46],
    stars: [4, 9],
    jackpot: '€48,000,000'
  }
];

export const getLatestDraw = (): DrawResult => MOCK_HISTORY[0];

export const getFrequencyStats = (history: DrawResult[]) => {
  const numberFreq: Record<number, number> = {};
  const starFreq: Record<number, number> = {};

  history.forEach(draw => {
    draw.numbers.forEach(n => numberFreq[n] = (numberFreq[n] || 0) + 1);
    draw.stars.forEach(s => starFreq[s] = (starFreq[s] || 0) + 1);
  });

  const sortedNumbers = Object.entries(numberFreq)
    .map(([val, count]) => ({ value: parseInt(val), count }))
    .sort((a, b) => b.count - a.count);

  const sortedStars = Object.entries(starFreq)
    .map(([val, count]) => ({ value: parseInt(val), count }))
    .sort((a, b) => b.count - a.count);

  return {
    hotNumbers: sortedNumbers.slice(0, 5),
    coldNumbers: sortedNumbers.slice(-5).reverse(),
    hotStars: sortedStars.slice(0, 2),
    coldStars: sortedStars.slice(-2).reverse(),
    allNumbers: sortedNumbers,
    allStars: sortedStars
  };
};
