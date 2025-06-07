import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type User = {
  id: number;
  auth0_id: string;
  email: string;
  name: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,

        setUser: (user) => {
            console.log('Setting user:', user);
          set({ user }, false, 'setUser');
        },

        clearUser: () => {
          set({ user: null }, false, 'clearUser');
        },
      }),
      {
        name: 'UserStore', // name of item in storage (must be unique)
        // storage: createJSONStorage(() => sessionStorage), // optional: use sessionStorage instead
      }
    ),
    {
      name: 'UserStore-Devtools',
    }
  )
);
