import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Configuración de headers realistas para evitar bloqueos
 */
export const DEFAULT_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Cache-Control': 'max-age=0'
};

/**
 * Fetch HTML de una URL con headers realistas
 */
export async function fetchHTML(url, customHeaders = {}) {
    try {
        const response = await axios.get(url, {
            headers: { ...DEFAULT_HEADERS, ...customHeaders },
            timeout: 15000,
            maxRedirects: 5,
            validateStatus: (status) => status < 500
        });

        if (response.status !== 200) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        throw error;
    }
}

/**
 * Parsear precio de texto a número
 */
export function parsePrice(priceText) {
    if (!priceText) return null;

    // Remover todo excepto números, comas y puntos
    const cleaned = priceText.replace(/[^\d,.]/g, '');

    // Manejar formato argentino: 1.234,56 o 1234,56
    const normalized = cleaned.replace(/\./g, '').replace(',', '.');

    const price = parseFloat(normalized);
    return isNaN(price) ? null : Math.round(price);
}

/**
 * Normalizar nombre de producto para búsqueda
 */
export function normalizeProductName(name) {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .trim();
}

/**
 * Delay aleatorio para evitar rate limiting
 */
export function randomDelay(min = 500, max = 1500) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Retry con backoff exponencial
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;

            const delay = baseDelay * Math.pow(2, i);
            console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

/**
 * Validar si un item de producto es válido
 */
export function isValidProduct(product) {
    return (
        product &&
        product.title &&
        product.title.length > 3 &&
        product.price &&
        product.price > 0
    );
}
