'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';    

export default function UserSyncClient({ user }: { user: any }) {
    const router = useRouter();

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
                .then((res) => {
                    if (res.ok) {
                        router.push('/upload');
                    } else {
                        console.error('Failed to sync user');
                    }
                })
                .catch(console.error);
        }
    }, [user, router]);

    return null;
}