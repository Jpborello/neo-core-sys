import React from 'react';

const Footer = () => (
    <footer className="bg-black py-12 border-t border-neutral-900 text-center" role="contentinfo">
        <div className="font-black text-xl tracking-tighter text-neutral-700 mb-4" aria-label="We Connect Logo">
            WE<span className="text-neutral-800">CONNECT</span>
        </div>
        <p className="text-neutral-600 text-sm">
            © {new Date().getFullYear()} WeConnect Agency Demo. <br className="hidden sm:block" />
            Designed for demonstration purposes (Next.js + Tailwind).
        </p>
    </footer>
);

export default Footer;
