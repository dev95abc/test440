'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/app/stores/userStore'; // adjust path as needed

export default function UserSyncClient({ user }: { user: any }) {
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);

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
                        router.push('/upload');
                        const data = await res.json();
                        console.log(data, 'this is data');
                        setUser(data?.user);

                    } else {
                        console.error('Failed to sync user');
                    }
                })
                .catch(console.error);
        }
    }, [user, router]);

    return null;
}