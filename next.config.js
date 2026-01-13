import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizeCss: true,
    },
    headers: async () => [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=31536000; includeSubDomains',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'X-Frame-Options',
                    value: 'DENY',
                },
                {
                    key: 'Referrer-Policy',
                    value: 'strict-origin-when-cross-origin',
                },
                {
                    key: 'Content-Security-Policy',
                    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https:;",
                },
            ],
        },
        {
            source: '/:all*(svg|jpg|png|webp|avif|woff2)',
            locale: false,
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000, immutable',
                }
            ],
        },
    ],
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
