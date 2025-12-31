import * as cheerio from 'cheerio';
import { fetchHTML, parsePrice, isValidProduct, retryWithBackoff } from './utils.js';

/**
 * Scraper para La Gallega
 * URL: https://www.lagallega.com.ar
 */
export async function scrapeLaGallega(productName) {
    console.log(`🔍 [La Gallega] Buscando: ${productName}`);

    try {
        const searchUrl = `https://www.lagallega.com.ar/buscar?q=${encodeURIComponent(productName)}`;

        const html = await retryWithBackoff(async () => {
            return await fetchHTML(searchUrl);
        });

        const $ = cheerio.load(html);
        const products = [];

        const selectors = [
            '.product',
            '.product-item',
            '.product-card',
            '[class*="product"]',
            '.item'
        ];

        let foundProducts = false;

        for (const selector of selectors) {
            const items = $(selector);

            if (items.length > 0) {
                console.log(`✅ [La Gallega] Encontrados ${items.length} productos con selector: ${selector}`);
                foundProducts = true;

                items.each((i, elem) => {
                    if (products.length >= 5) return false;

                    try {
                        const titleSelectors = [
                            '.product-title',
                            '.product-name',
                            'h3',
                            'h4',
                            '[class*="title"]',
                            '[class*="name"]'
                        ];

                        let title = null;
                        for (const titleSel of titleSelectors) {
                            title = $(elem).find(titleSel).first().text().trim();
                            if (title) break;
                        }

                        const priceSelectors = [
                            '.product-price',
                            '.price',
                            '[class*="price"]',
                            '[class*="precio"]'
                        ];

                        let priceText = null;
                        for (const priceSel of priceSelectors) {
                            priceText = $(elem).find(priceSel).first().text().trim();
                            if (priceText) break;
                        }

                        const price = parsePrice(priceText);
                        const link = $(elem).find('a').first().attr('href');
                        const fullLink = link ? (link.startsWith('http') ? link : `https://www.lagallega.com.ar${link}`) : searchUrl;

                        const product = {
                            title: title || 'Producto sin nombre',
                            price: price || 0,
                            link: fullLink,
                            source: 'La Gallega'
                        };

                        if (isValidProduct(product)) {
                            products.push(product);
                        }
                    } catch (err) {
                        console.warn(`⚠️ [La Gallega] Error procesando item:`, err.message);
                    }
                });

                break;
            }
        }

        if (!foundProducts) {
            console.warn(`⚠️ [La Gallega] No se encontraron productos.`);
            return {
                source: 'La Gallega',
                items: [],
                error: 'No se encontraron productos',
                requiresPuppeteer: true
            };
        }

        console.log(`✅ [La Gallega] Scraping exitoso: ${products.length} productos`);

        return {
            source: 'La Gallega',
            items: products,
            scrapedAt: new Date().toISOString(),
            isReal: true
        };

    } catch (error) {
        console.error(`❌ [La Gallega] Error:`, error.message);
        return {
            source: 'La Gallega',
            items: [],
            error: error.message,
            requiresPuppeteer: true
        };
    }
}
