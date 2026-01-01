import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // Lista de locales soportados
    locales: ['en', 'es'],

    // Locale por defecto (español)
    defaultLocale: 'es'
});
