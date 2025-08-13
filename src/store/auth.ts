// import api, { getCsrf } from "@/api/axios";
// import User from "@/types/User";
// import { useNavigate } from "react-router-dom";
// import { create } from "zustand";

// interface AuthState {
//   user: User;
//   loading: boolean;
//   getUser: () => Promise<void>;
//   login: (email: string, password: string) => Promise<any>;
//   logout: () => Promise<any>;
// }


// export const useAuth = create<AuthState>((set) => ({
//   user: null,
//   loading: true,
  
//   getUser: async () => {
//     try {
//       const { data } = await api.get("/api/user");
//       // console.log(data);
//       set({ user: data, loading: false });
//     } catch {
//       set({ user: null, loading: false });
//     }
//   },

//   login: async (email, password) => {
//     await getCsrf();
//     const res = await api.post("/api/login", { email, password });
//     console.log(res);
//     set({ user: res.data.user });

//     return res;
//   },

//   logout: async () => {
//     const res = await api.post("/api/logout");
//     set({ user: null });

//     return res;
//   },
// }));

// store/auth.ts
import api, { getCsrf } from "@/api/axios";
import User from "@/types/User";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  loading: boolean;
  getUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,

  getUser: async () => {
    try {
      const { data } = await api.get("/api/user");
      set({ user: data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  login: async (email, password) => {
    await getCsrf();
    const res = await api.post("/api/login", { email, password });
    set({ user: res.data.user });
    return res;
  },

  logout: async () => {
    const res = await api.post("/api/logout");
    set({ user: null });
    return res;
  },
}));
