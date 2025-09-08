import { getCookie, setCookie } from "cookies-next";
import { StateStorage } from "zustand/middleware";

const cookiesStorage: StateStorage = {
  getItem: (name: string) => {
    return getCookie(name) ?? null;
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });
  },
  removeItem: (name: string) => {
    setCookie(name, "", { expires: new Date(0) });
  },
};

export default cookiesStorage;
