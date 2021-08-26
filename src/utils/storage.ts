import Todo from '../models/Todo';

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
  localStorage.removeItem('key');
};

export const getTodos = () => {
  return getItem('todos');
};

export const saveTodos = (todos: Todo[]) => {
  saveItem('todos', JSON.stringify(todos));
};

export const removeAllTodo = () => {
  removeItem('todos');
};
