import * as cheerio from 'cheerio';
import { fetchHTML, parsePrice, isValidProduct, retryWithBackoff } from './utils.js';

/**
 * Scraper para Coto Digital
 * URL: https://www.cotodigital3.com.ar
 */
export async function scrapeCoto(productName) {
    console.log(`🔍 [Coto] Buscando: ${productName}`);

    try {
        const searchUrl = `https://www.cotodigital3.com.ar/sitios/cdigi/browse?_dyncharset=UTF-8&Ntt=${encodeURIComponent(productName)}`;

        const html = await retryWithBackoff(async () => {
            return await fetchHTML(searchUrl);
        });

        const $ = cheerio.load(html);
        const products = [];

        // Intentar múltiples selectores (pueden cambiar)
        const selectors = [
            '.product_info_container',
            '.product-item',
            '.atg_store_productListing',
            '[data-name="product"]'
        ];

        let foundProducts = false;

        for (const selector of selectors) {
            const items = $(selector);

            if (items.length > 0) {
                console.log(`✅ [Coto] Encontrados ${items.length} productos con selector: ${selector}`);
                foundProducts = true;

                items.each((i, elem) => {
                    if (products.length >= 5) return false; // Máximo 5

                    try {
                        // Intentar extraer título
                        const titleSelectors = [
                            '.descrip_full',
                            '.product-name',
                            '.product-title',
                            'h3',
                            'h4',
                            '[class*="product"] [class*="name"]'
                        ];

                        let title = null;
                        for (const titleSel of titleSelectors) {
                            title = $(elem).find(titleSel).first().text().trim();
                            if (title) break;
                        }

                        // Intentar extraer precio
                        const priceSelectors = [
                            '.atg_store_newPrice',
                            '.price',
                            '.product-price',
                            '[class*="price"]',
                            'span[class*="precio"]'
                        ];

                        let priceText = null;
                        for (const priceSel of priceSelectors) {
                            priceText = $(elem).find(priceSel).first().text().trim();
                            if (priceText) break;
                        }

                        const price = parsePrice(priceText);

                        // Intentar extraer link
                        const link = $(elem).find('a').first().attr('href');
                        const fullLink = link ? (link.startsWith('http') ? link : `https://www.cotodigital3.com.ar${link}`) : searchUrl;

                        const product = {
                            title: title || 'Producto sin nombre',
                            price: price || 0,
                            link: fullLink,
                            source: 'Coto Digital'
                        };

                        if (isValidProduct(product)) {
                            products.push(product);
                        }
                    } catch (err) {
                        console.warn(`⚠️ [Coto] Error procesando item:`, err.message);
                    }
                });

                break; // Si encontramos productos, no seguir probando selectores
            }
        }

        if (!foundProducts) {
            console.warn(`⚠️ [Coto] No se encontraron productos. HTML podría estar cargado dinámicamente.`);
            return {
                source: 'Coto Digital',
                items: [],
                error: 'No se encontraron productos (posible JavaScript dinámico)',
                requiresPuppeteer: true
            };
        }

        console.log(`✅ [Coto] Scraping exitoso: ${products.length} productos`);

        return {
            source: 'Coto Digital',
            items: products,
            scrapedAt: new Date().toISOString(),
            isReal: true
        };

    } catch (error) {
        console.error(`❌ [Coto] Error:`, error.message);
        return {
            source: 'Coto Digital',
            items: [],
            error: error.message,
            requiresPuppeteer: error.message.includes('timeout') || error.message.includes('403')
        };
    }
}
