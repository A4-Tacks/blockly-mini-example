const storageKey = 'custom';

export function read(key = storageKey) {
  return window.localStorage.getItem(key)
}

export function write(msg: string, key = storageKey) {
  return window.localStorage.setItem(key, msg)
}
