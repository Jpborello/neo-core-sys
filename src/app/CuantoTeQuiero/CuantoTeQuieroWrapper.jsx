"use client";

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CuantoTeQuieroApp from '../../webs/cuanto-te-quiero/App';

export default function CuantoTeQuieroWrapper() {
    if (typeof window === 'undefined') return null;

    return (
        <BrowserRouter basename="/CuantoTeQuiero">
            <CuantoTeQuieroApp />
        </BrowserRouter>
    );
}
