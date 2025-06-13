'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/app/stores/userStore';
import { useLearnedTopicsStore } from '@/app/stores/learnedTopicsStore';

interface AuthUser {
  given_name: string;
  nickname: string;
  name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  sub: string;
}

export default function UserSyncClient({ user }: { user: AuthUser }) {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const { setLearnedTopics } = useLearnedTopicsStore();

  useEffect(() => {
    if (user?.sub && user?.email) {
      fetch('/api/sync-user', {
        method: 'POST',
        body: JSON.stringify({
          auth0_id: user.sub,
          email: user.email,
          name: user.name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            console.log(data.user.user, data.user.learnedTopics, 'this is data');
            setUser(data?.user.user);
            setLearnedTopics(data?.user.learnedTopics || []);
            router.push('/upload');
          } else {
            console.error('Failed to sync user');
          }
        })
        .catch(console.error);
    }
  }, [user, router, setUser, setLearnedTopics]);

  return null;
}
