const { localStorage } = window;

export const get = (field = '') => localStorage && localStorage.getItem(field);

export const set = (field = '', value) => localStorage && localStorage.setItem(field, value);

export const remove = (field = '') => localStorage && localStorage.removeItem(field);
