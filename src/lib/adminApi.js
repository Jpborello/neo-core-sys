/**
 * Admin API Layer
 * 
 * Este archivo contiene todas las funciones de acceso a datos del panel de admin.
 * Actualmente usa simulación (Context API), pero está preparado para migrar a Supabase.
 * 
 * Para migrar a Supabase:
 * 1. Descomentar las importaciones de Supabase
 * 2. Reemplazar las funciones mock por las implementaciones reales
 * 3. Actualizar el DemoContext para usar estas funciones
 */

// import { supabase } from './supabase'; // Descomentar cuando se migre a Supabase

// ============================================
// ORDERS API
// ============================================

/**
 * Fetch all orders
 * @returns {Promise<Object>} { data: Array, error: Error|null }
 */
export const fetchOrders = async () => {
    // MOCK VERSION (actual)
    const mockOrders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
    return { data: mockOrders, error: null };

    // SUPABASE VERSION (para migración futura)
    // const { data, error } = await supabase
    //     .from('orders')
    //     .select('*')
    //     .order('created_at', { ascending: false });
    // return { data, error };
};

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} newStatus - New status (pending, sent, delivered)
 * @returns {Promise<Object>} { data: Object, error: Error|null }
 */
export const updateOrderStatus = async (orderId, newStatus) => {
    // MOCK VERSION (actual)
    const orders = JSON.parse(localStorage.getItem('demo_orders') || '[]');
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem('demo_orders', JSON.stringify(updated));
    return { data: updated.find(o => o.id === orderId), error: null };

    // SUPABASE VERSION (para migración futura)
    // const { data, error } = await supabase
    //     .from('orders')
    //     .update({ status: newStatus })
    //     .eq('id', orderId)
    //     .select()
    //     .single();
    // return { data, error };
};

// ============================================
// PRODUCTS API
// ============================================

/**
 * Fetch all products
 * @returns {Promise<Object>} { data: Array, error: Error|null }
 */
export const fetchProducts = async () => {
    // MOCK VERSION (actual)
    const mockProducts = JSON.parse(localStorage.getItem('demo_products') || '[]');
    return { data: mockProducts, error: null };

    // SUPABASE VERSION (para migración futura)
    // const { data, error } = await supabase
    //     .from('products')
    //     .select('id, name, price, category, is_active, stock, image')
    //     .order('name');
    // return { data, error };
};

/**
 * Update product
 * @param {Object} product - Product data
 * @returns {Promise<Object>} { data: Object, error: Error|null }
 */
export const updateProduct = async (product) => {
    // MOCK VERSION (actual)
    const products = JSON.parse(localStorage.getItem('demo_products') || '[]');
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
        products[index] = product;
    } else {
        products.push({ ...product, id: Date.now() });
    }
    localStorage.setItem('demo_products', JSON.stringify(products));
    return { data: product, error: null };

    // SUPABASE VERSION (para migración futura)
    // if (product.id) {
    //     const { data, error } = await supabase
    //         .from('products')
    //         .update(product)
    //         .eq('id', product.id)
    //         .select()
    //         .single();
    //     return { data, error };
    // } else {
    //     const { data, error } = await supabase
    //         .from('products')
    //         .insert([product])
    //         .select()
    //         .single();
    //     return { data, error };
    // }
};

/**
 * Delete product
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} { data: null, error: Error|null }
 */
export const deleteProduct = async (productId) => {
    // MOCK VERSION (actual)
    const products = JSON.parse(localStorage.getItem('demo_products') || '[]');
    const filtered = products.filter(p => p.id !== productId);
    localStorage.setItem('demo_products', JSON.stringify(filtered));
    return { data: null, error: null };

    // SUPABASE VERSION (para migración futura)
    // const { data, error } = await supabase
    //     .from('products')
    //     .delete()
    //     .eq('id', productId);
    // return { data, error };
};

// ============================================
// CAROUSEL API
// ============================================

/**
 * Fetch carousel slides
 * @returns {Promise<Object>} { data: Array, error: Error|null }
 */
export const fetchCarouselSlides = async () => {
    // MOCK VERSION (actual)
    const mockSlides = JSON.parse(localStorage.getItem('demo_carousel') || '[]');
    return { data: mockSlides, error: null };

    // SUPABASE VERSION (para migración futura)
    // const { data, error } = await supabase
    //     .from('slides')
    //     .select('*')
    //     .eq('active', true)
    //     .order('display_order', { ascending: true });
    // return { data, error };
};

/**
 * Update carousel slides
 * @param {Array} slides - Array of slide objects
 * @returns {Promise<Object>} { data: Array, error: Error|null }
 */
export const updateCarouselSlides = async (slides) => {
    // MOCK VERSION (actual)
    localStorage.setItem('demo_carousel', JSON.stringify(slides));
    return { data: slides, error: null };

    // SUPABASE VERSION (para migración futura)
    // // Delete all existing slides and insert new ones
    // await supabase.from('slides').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    // const { data, error } = await supabase
    //     .from('slides')
    //     .insert(slides)
    //     .select();
    // return { data, error };
};

// ============================================
// RAFFLE API
// ============================================

/**
 * Fetch raffle winners
 * @returns {Promise<Object>} { data: Array, error: Error|null }
 */
export const fetchRaffleWinners = async () => {
    // MOCK VERSION (actual)
    const mockWinners = JSON.parse(localStorage.getItem('demo_raffle_winners') || '[]');
    return { data: mockWinners, error: null };

    // SUPABASE VERSION (para migración futura)
    // const { data, error } = await supabase
    //     .from('raffle_winners')
    //     .select('*')
    //     .order('date', { ascending: false });
    // return { data, error };
};

/**
 * Add raffle winner
 * @param {Object} winner - Winner data
 * @returns {Promise<Object>} { data: Object, error: Error|null }
 */
export const addRaffleWinner = async (winner) => {
    // MOCK VERSION (actual)
    const winners = JSON.parse(localStorage.getItem('demo_raffle_winners') || '[]');
    winners.push(winner);
    localStorage.setItem('demo_raffle_winners', JSON.stringify(winners));
    return { data: winner, error: null };

    // SUPABASE VERSION (para migración futura)
    // const { data, error } = await supabase
    //     .from('raffle_winners')
    //     .insert([winner])
    //     .select()
    //     .single();
    // return { data, error };
};

/**
 * Get raffle active status
 * @returns {Promise<Object>} { data: boolean, error: Error|null }
 */
export const getRaffleStatus = async () => {
    // MOCK VERSION (actual)
    const isActive = localStorage.getItem('demo_raffle_active') === 'true';
    return { data: isActive, error: null };

    // SUPABASE VERSION (para migración futura)
    // const { data, error } = await supabase
    //     .from('raffle_settings')
    //     .select('is_active')
    //     .single();
    // return { data: data?.is_active || false, error };
};

/**
 * Toggle raffle active status
 * @returns {Promise<Object>} { data: boolean, error: Error|null }
 */
export const toggleRaffleStatus = async () => {
    // MOCK VERSION (actual)
    const current = localStorage.getItem('demo_raffle_active') === 'true';
    const newStatus = !current;
    localStorage.setItem('demo_raffle_active', String(newStatus));
    return { data: newStatus, error: null };

    // SUPABASE VERSION (para migración futura)
    // const { data: current } = await supabase
    //     .from('raffle_settings')
    //     .select('is_active')
    //     .single();
    // 
    // const newStatus = !current?.is_active;
    // const { data, error } = await supabase
    //     .from('raffle_settings')
    //     .update({ is_active: newStatus })
    //     .eq('id', 1)
    //     .select('is_active')
    //     .single();
    // return { data: data?.is_active, error };
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Handle API errors
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error) => {
    console.error('API Error:', error);

    // Mensajes de error personalizados
    if (error?.message?.includes('network')) {
        return 'Error de conexión. Verifica tu internet.';
    }
    if (error?.message?.includes('auth')) {
        return 'Sesión expirada. Por favor, vuelve a iniciar sesión.';
    }
    if (error?.code === 'PGRST116') {
        return 'No se encontraron datos.';
    }

    return 'Ocurrió un error. Por favor, intenta nuevamente.';
};

/**
 * Simulate async delay (for mock functions)
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));
