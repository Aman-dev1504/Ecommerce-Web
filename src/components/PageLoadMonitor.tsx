'use client';

import { useEffect } from 'react';

export default function PageLoadMonitor() {
    useEffect(() => {
        const timeSincePageLoad = performance.now();
        console.log(`[Performance] Page loaded in ${timeSincePageLoad.toFixed(2)} ms`);
    }, []);

    return null;
}
