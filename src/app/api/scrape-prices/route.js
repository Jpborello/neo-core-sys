import { NextResponse } from 'next/server';
import { scrapeCoto } from '@/lib/scrapers/coto';
import { scrapeCarrefour } from '@/lib/scrapers/carrefour';
import { scrapeLaGallega } from '@/lib/scrapers/lagallega';

// Cache simple en memoria (5 minutos)
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// Base de datos de precios realistas de Rosario (fallback)
const PRECIOS_ROSARIO = {
    'asado': { min: 14500, avg: 17000, max: 19500, unit: 'kg' },
    'vacio': { min: 12500, avg: 14000, max: 15500, unit: 'kg' },
    'vacío': { min: 12500, avg: 14000, max: 15500, unit: 'kg' },
    'tira de asado': { min: 14000, avg: 16500, max: 19000, unit: 'kg' },
    'chorizo': { min: 7500, avg: 9000, max: 10500, unit: 'kg' },
    'morcilla': { min: 7000, avg: 8200, max: 9500, unit: 'kg' },
};

const FUENTES_LOCALES = [
    'Coto Digital Rosario',
    'La Gallega Rosario',
    'Carrefour Rosario',
    'Carnes El Chañar',
    'Corte Criollo',
    'Carnicería Local Centro'
];

function encontrarPrecioBase(productName) {
    const nombreLower = productName.toLowerCase();
    if (PRECIOS_ROSARIO[nombreLower]) {
        return PRECIOS_ROSARIO[nombreLower];
    }
    for (const [key, value] of Object.entries(PRECIOS_ROSARIO)) {
        if (nombreLower.includes(key) || key.includes(nombreLower)) {
            return value;
        }
    }
    return { min: 8000, avg: 12000, max: 16000, unit: 'kg' };
}

function generarPreciosRealistasRosario(productName) {
    const precioBase = encontrarPrecioBase(productName);
    const productos = [];

    for (let i = 0; i < 5; i++) {
        const fuente = FUENTES_LOCALES[i % FUENTES_LOCALES.length];
        const rango = precioBase.max - precioBase.min;
        const variacion = Math.random() * rango;
        const precio = Math.round(precioBase.min + variacion);

        const titulos = [
            `${productName} - ${fuente}`,
            `${productName} Premium x ${precioBase.unit}`,
            `${productName} Calidad Superior`,
            `${productName} Argentino - Oferta`,
            `${productName} Fresco del Día`
        ];

        productos.push({
            title: titulos[i],
            price: precio,
            link: `https://rosario-local.com.ar/producto/${i}`,
            source: fuente
        });
    }

    return productos;
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const productName = searchParams.get('product');
        const useReal = searchParams.get('real') === 'true';

        if (!productName) {
            return NextResponse.json(
                { error: 'Falta el parámetro "product"' },
                { status: 400 }
            );
        }

        // Si no se pide scraping real, usar datos simulados
        if (!useReal) {
            console.log(`📊 [API] Generando datos simulados para: ${productName}`);
            const products = generarPreciosRealistasRosario(productName);

            return NextResponse.json({
                source: 'Rosario Local (Datos Dic 2024)',
                items: products,
                scrapedAt: new Date().toISOString(),
                count: products.length,
                isSimulated: true,
                basedOnRealPrices: true
            });
        }

        // Verificar cache
        const cacheKey = `scrape_${productName}`;
        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            console.log(`✅ [API] Usando datos en cache para: ${productName}`);
            return NextResponse.json({
                ...cached.data,
                fromCache: true
            });
        }

        console.log(`🔍 [API] Iniciando scraping REAL para: ${productName}`);

        // Scraping en paralelo de los 3 sitios
        const [cotoResult, carrefourResult, gallegaResult] = await Promise.allSettled([
            scrapeCoto(productName),
            scrapeCarrefour(productName),
            scrapeLaGallega(productName)
        ]);

        const sources = [];
        let totalItems = 0;
        let requiresPuppeteer = false;

        // Procesar resultado de Coto
        if (cotoResult.status === 'fulfilled' && cotoResult.value.items.length > 0) {
            sources.push(cotoResult.value);
            totalItems += cotoResult.value.items.length;
            console.log(`✅ [API] Coto: ${cotoResult.value.items.length} productos`);
        } else {
            console.warn(`⚠️ [API] Coto falló o no encontró productos`);
            if (cotoResult.value?.requiresPuppeteer) requiresPuppeteer = true;
        }

        // Procesar resultado de Carrefour
        if (carrefourResult.status === 'fulfilled' && carrefourResult.value.items.length > 0) {
            sources.push(carrefourResult.value);
            totalItems += carrefourResult.value.items.length;
            console.log(`✅ [API] Carrefour: ${carrefourResult.value.items.length} productos`);
        } else {
            console.warn(`⚠️ [API] Carrefour falló o no encontró productos`);
            if (carrefourResult.value?.requiresPuppeteer) requiresPuppeteer = true;
        }

        // Procesar resultado de La Gallega
        if (gallegaResult.status === 'fulfilled' && gallegaResult.value.items.length > 0) {
            sources.push(gallegaResult.value);
            totalItems += gallegaResult.value.items.length;
            console.log(`✅ [API] La Gallega: ${gallegaResult.value.items.length} productos`);
        } else {
            console.warn(`⚠️ [API] La Gallega falló o no encontró productos`);
            if (gallegaResult.value?.requiresPuppeteer) requiresPuppeteer = true;
        }

        // Si no se encontró nada, usar datos simulados
        if (totalItems === 0) {
            console.warn(`⚠️ [API] Scraping falló completamente, usando datos simulados`);

            const fallbackData = {
                source: 'Rosario Local (Fallback)',
                items: generarPreciosRealistasRosario(productName),
                scrapedAt: new Date().toISOString(),
                count: 5,
                isSimulated: true,
                scrapingFailed: true,
                requiresPuppeteer,
                message: requiresPuppeteer
                    ? 'Los sitios requieren JavaScript. Considera usar Puppeteer.'
                    : 'No se encontraron productos en los sitios.'
            };

            return NextResponse.json(fallbackData);
        }

        // Respuesta exitosa con datos reales
        const responseData = {
            sources,
            scrapedAt: new Date().toISOString(),
            totalItems,
            isReal: true,
            productName,
            message: `Scraping exitoso de ${sources.length} fuente(s)`
        };

        // Guardar en cache
        cache.set(cacheKey, {
            data: responseData,
            timestamp: Date.now()
        });

        console.log(`✅ [API] Scraping completado: ${totalItems} productos de ${sources.length} fuente(s)`);

        return NextResponse.json(responseData);

    } catch (error) {
        console.error('❌ [API] Error general:', error.message);

        // Fallback a datos simulados en caso de error
        const productName = new URL(request.url).searchParams.get('product') || 'Producto';

        return NextResponse.json({
            source: 'Rosario Local (Error Fallback)',
            items: generarPreciosRealistasRosario(productName),
            scrapedAt: new Date().toISOString(),
            count: 5,
            isSimulated: true,
            error: error.message
        }, { status: 200 }); // 200 para que el frontend no falle
    }
}
