"use client";

import dynamic from 'next/dynamic';

// Importing ChatWidget with ssr: false inside a Client Component is allowed
const ChatWidget = dynamic(() => import('./ChatWidget'), {
    ssr: false,
});

export default function LazyChatWidget() {
    return <ChatWidget />;
}
