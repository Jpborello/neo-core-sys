'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = () => {
        const newLocale = locale === 'en' ? 'es' : 'en';

        // Reemplazar el locale en la URL actual
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPathname);
    };

    return (
        <button
            onClick={switchLocale}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
            title={locale === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
        >
            <span className="text-base">{locale === 'en' ? '🇪🇸' : '🇺🇸'}</span>
            <span>{locale === 'en' ? 'ES' : 'EN'}</span>
        </button>
    );
}
