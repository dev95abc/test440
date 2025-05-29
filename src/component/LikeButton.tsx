
// components/LikeButton.tsx
import { useState } from 'react';

type Props = {
    likes: number;
};

export default function LikeButton({ likes }: Props) {
    console.log(likes, 'likes') 
    const [count, setCount] = useState(likes);

    return (
        <button
            onClick={() => {setCount((c) => c + 1)}}
            className="text-sm text-blue-600 hover:underline"
        >
            👍 {count} Like{count !== 1 && 's'} 
        </button>
    );
}
