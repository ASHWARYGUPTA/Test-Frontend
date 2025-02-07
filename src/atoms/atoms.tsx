import { atom, selector } from "recoil";

export const triggerIsSignedIn = atom({
  key: "triggerIsSignedIn",
  default: 0,
});

export const isSignedIn = selector({
  key: "isSignedIn",
  get: async ({ get }) => {
    get(triggerIsSignedIn);
    return await fetch("http://localhost:3000/signin/isSignedIn", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.value);
        return res.value;
      });
  },
});

export const triggerGetAccounts = atom({
  key: "triggerGetAccounts",
  default: 0,
});

export const GetAccounts = selector({
  key: "GetAccounts",
  get: async ({ get }) => {
    get(triggerGetAccounts);
    return await fetch("http://localhost:3000/getAccounts", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.value);
        return res.response;
      });
  },
});
