import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Often helpful to disable for legacy React apps moving to Next
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allow all for now during migration to avoid broken images
            },
        ],
        // unoptimized: true removed to enable optimization
    },

};

export default withNextIntl(nextConfig);
