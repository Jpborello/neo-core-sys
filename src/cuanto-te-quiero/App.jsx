import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import { ProductProvider } from './context/ProductContext';

import ErrorBoundary from '../components/ErrorBoundary';

export default function CuantoTeQuieroApp() {
    return (
        <ErrorBoundary>
            <ProductProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="categoria/:category" element={<Catalog />} />
                    </Route>
                </Routes>
            </ProductProvider>
        </ErrorBoundary>
    );
}
