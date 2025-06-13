// components/LikeButton.tsx
import { useState, useEffect } from 'react';
import { Explanation } from '@/types';
import { useUser } from '@auth0/nextjs-auth0';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { useUserStore } from '@/app/stores/userStore';

type Props = {
    explanation: Explanation;
};

export default function LikeButton({ explanation }: Props) {
    const { user, isLoading } = useUser();
    const [count, setCount] = useState(explanation.likes_count || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoadingState, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const userL = useUserStore((state) => state.user);

    // Check if user already liked this explanation
    useEffect(() => {
        if (user && explanation.liked_by) {
            setIsLiked(explanation.liked_by.some(u => Number(u) ==Number(userL?.id)));
            //   setIsLiked(explanation.liked_by.some(u => u === user.sub));
        }
    }, [user, explanation.liked_by, userL?.id]);

    const handleLike = async () => {
        if (!user) {
            setError('Please login to like explanations');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/like/${explanation.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    auth0_id: user.sub,
                    email: user.email,
                    name: user.name,
                    picture: user.picture
                }),
            });

            if (!res.ok) {
                throw new Error(await res.text() || 'Failed to like explanation');
            }
 
            const newCount = isLiked ? count - 1 : count + 1;

            setCount(newCount);
            setIsLiked(!isLiked);

        } catch (err) {
            console.error('Like failed:', err);
            setError(err instanceof Error ? err.message : 'Error liking explanation');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <button
                onClick={handleLike}
                disabled={isLoadingState || isLoading}
                aria-label={isLiked ? 'Unlike this explanation' : 'Like this explanation'}
                className={`flex items-center gap-1 p-1 rounded-md transition-colors ${isLiked
                        ? 'text-red-500 hover:bg-red-50'
                        : 'text-gray-500 hover:bg-gray-50'
                    } ${isLoadingState ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
            >
                {isLiked ? (
                    <HeartFilledIcon className="w-5 h-5" />
                ) : (
                    <HeartIcon className="w-5 h-5" />
                )}
                <span className="text-sm">{count}</span>
            </button>
            {error && (
                <span className="text-xs text-red-500 ml-1">{error}</span>
            )}
        </div>
    );
}