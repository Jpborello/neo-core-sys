import React, { createContext, useContext, useMemo } from 'react';
import { getProducts } from '@/lib/utils';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const products = useMemo(() => getProducts(), []);

    // Group by category
    const categories = useMemo(() => {
        const groups = {};
        products.forEach(product => {
            if (!groups[product.category]) {
                groups[product.category] = [];
            }
            groups[product.category].push(product);
        });
        return groups;
    }, [products]);

    return (
        <ProductContext.Provider value={{ products, categories }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
