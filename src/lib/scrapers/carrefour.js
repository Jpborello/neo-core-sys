import * as cheerio from 'cheerio';
import { fetchHTML, parsePrice, isValidProduct, retryWithBackoff } from './utils.js';

/**
 * Scraper para Carrefour Argentina
 * URL: https://www.carrefour.com.ar
 */
export async function scrapeCarrefour(productName) {
    console.log(`🔍 [Carrefour] Buscando: ${productName}`);

    try {
        const searchUrl = `https://www.carrefour.com.ar/${encodeURIComponent(productName)}`;

        const html = await retryWithBackoff(async () => {
            return await fetchHTML(searchUrl);
        });

        const $ = cheerio.load(html);
        const products = [];

        // Selectores posibles para Carrefour
        const selectors = [
            '[data-testid="product-card"]',
            '.product-card',
            '.vtex-product-summary',
            '.vtex-search-result-3-x-galleryItem',
            '[class*="productSummary"]'
        ];

        let foundProducts = false;

        for (const selector of selectors) {
            const items = $(selector);

            if (items.length > 0) {
                console.log(`✅ [Carrefour] Encontrados ${items.length} productos con selector: ${selector}`);
                foundProducts = true;

                items.each((i, elem) => {
                    if (products.length >= 5) return false;

                    try {
                        const titleSelectors = [
                            '[data-testid="product-title"]',
                            '.vtex-product-summary-2-x-productBrand',
                            'h2',
                            'h3',
                            '[class*="productName"]'
                        ];

                        let title = null;
                        for (const titleSel of titleSelectors) {
                            title = $(elem).find(titleSel).first().text().trim();
                            if (title) break;
                        }

                        const priceSelectors = [
                            '[data-testid="price"]',
                            '.vtex-product-price-1-x-sellingPrice',
                            '[class*="sellingPrice"]',
                            '[class*="price"]'
                        ];

                        let priceText = null;
                        for (const priceSel of priceSelectors) {
                            priceText = $(elem).find(priceSel).first().text().trim();
                            if (priceText) break;
                        }

                        const price = parsePrice(priceText);
                        const link = $(elem).find('a').first().attr('href');
                        const fullLink = link ? (link.startsWith('http') ? link : `https://www.carrefour.com.ar${link}`) : searchUrl;

                        const product = {
                            title: title || 'Producto sin nombre',
                            price: price || 0,
                            link: fullLink,
                            source: 'Carrefour'
                        };

                        if (isValidProduct(product)) {
                            products.push(product);
                        }
                    } catch (err) {
                        console.warn(`⚠️ [Carrefour] Error procesando item:`, err.message);
                    }
                });

                break;
            }
        }

        if (!foundProducts) {
            console.warn(`⚠️ [Carrefour] No se encontraron productos. Posible JavaScript dinámico.`);
            return {
                source: 'Carrefour',
                items: [],
                error: 'No se encontraron productos (posible JavaScript dinámico)',
                requiresPuppeteer: true
            };
        }

        console.log(`✅ [Carrefour] Scraping exitoso: ${products.length} productos`);

        return {
            source: 'Carrefour',
            items: products,
            scrapedAt: new Date().toISOString(),
            isReal: true
        };

    } catch (error) {
        console.error(`❌ [Carrefour] Error:`, error.message);
        return {
            source: 'Carrefour',
            items: [],
            error: error.message,
            requiresPuppeteer: true
        };
    }
}
