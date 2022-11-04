import { defineStore } from "pinia";
import { auth, userData } from "@/types/authTypes";
import { appConfig } from "@/config/appconfig";

let TIMER = null as number | null;

export const useAuthStore = defineStore("auth", {
  state: (): userData => {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
      registered: false,
    };
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
    async authenticate(data: auth) {
      let authType = "";
      if (data.authType === "login") {
        authType = "signInWithPassword";
      } else {
        authType = "signUp";
      }
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${authType}?key=${appConfig.appkey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to authenticate."
        );
        throw error;
      }

      const expiresIn = (responseData.expiresIn * 1000) as number;
      const expirationDate = (new Date().getTime() +
        expiresIn) as unknown as string;

      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);

      TIMER = setTimeout(this.autoLogout, expiresIn);

      this.setUser({
        token: responseData.idToken,
        userId: responseData.localId,
        didAutoLogout: false,
      });
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      const expiresIn = ((tokenExpiration as unknown as number) -
        new Date().getTime()) as number;

      if (expiresIn < 0) return;

      TIMER = setTimeout(this.autoLogout, expiresIn);

      if (token && userId) {
        this.setUser({
          token,
          userId,
        });
      }
    },
    setUser(userData: userData) {
      this.token = userData.token;
      this.userId = userData.userId;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      clearTimeout(TIMER as number);

      this.token = null;
      this.userId = null;
    },
    autoLogout() {
      this.logout;
      this.didAutoLogout = true;
    },
  },
});
