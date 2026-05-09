export const setStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
 
export const getStorage = (key: string) => {
  if (typeof window === 'undefined') return null; // Prevent SSR crash
  const item = localStorage.getItem(key);
  if (!item) return null;
  
  try {
    const parsed = JSON.parse(item);
    // Additional safety check: if the parsed result is a string that looks like JSON,
    // it might be double-stringified, so try parsing again
    if (typeof parsed === 'string' && parsed.startsWith('{') && parsed.endsWith('}')) {
      console.warn(`Potential double-stringification detected for key: ${key}`);
      return JSON.parse(parsed);
    }
    return parsed;
  } catch (error) {
    console.error(`Failed to parse localStorage item for key "${key}":`, error);
    return null;
  }
};


export const removeStorage = (key: string) => localStorage.removeItem(key);

// Utility function to clear corrupted localStorage data
export const clearCorruptedStorage = (key: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    const item = localStorage.getItem(key);
    if (item) {
      // Try to parse the item
      JSON.parse(item);
      // If parsing succeeds, the data is fine
    }
  } catch (error) {
    // If parsing fails, the data is corrupted, so remove it
    console.warn(`Clearing corrupted localStorage data for key: ${key}`);
    localStorage.removeItem(key);
  }
};

export const clearStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};
