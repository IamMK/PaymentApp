export type auth = {
  email: string;
  password: string;
  returnSecureToken?: boolean;
  authType: "login" | "signup";
};

export type userData = {
  token: string | null;
  userId: string | null;
  didAutoLogout?: boolean;
  registered?: boolean;
};
