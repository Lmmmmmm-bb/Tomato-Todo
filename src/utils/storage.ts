export const getItem = (name: string) => {
  return localStorage.getItem(name);
};

export const clearStorage = () => {
  localStorage.clear();
};

export const saveItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
