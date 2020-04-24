const prefix = "blog/";

const storage = {
  get(name) {
    return JSON.parse(window.sessionStorage.getItem(`${prefix + name}`));
  },
  set(name, data) {
    window.sessionStorage.setItem(`${prefix + name}`, JSON.stringify(data));
  },
  remove(name) {
    window.sessionStorage.removeItem(`${prefix + name}`);
  },
  clear() {
    window.sessionStorage.clear();
  },
};

export default storage;
