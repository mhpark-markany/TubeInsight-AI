import { SearchHistoryItem } from '../types';

const KEY = 'tubeinsight_history';
const MAX_ITEMS = 10;

export const getHistory = (): SearchHistoryItem[] => {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

export const addToHistory = (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>): SearchHistoryItem[] => {
  const history = getHistory();
  
  // Create new item
  const newItem: SearchHistoryItem = {
    ...item,
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    timestamp: Date.now(),
  };

  // Remove existing entry with same URL to avoid duplicates (we'll move it to top)
  const filtered = history.filter(h => h.url !== item.url);
  
  // Add new item to the beginning and limit list size
  const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
  
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
};

export const removeFromHistory = (id: string): SearchHistoryItem[] => {
  const history = getHistory();
  const updated = history.filter(h => h.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
};

export const clearHistory = (): SearchHistoryItem[] => {
  localStorage.removeItem(KEY);
  return [];
};
