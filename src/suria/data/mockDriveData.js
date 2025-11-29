export const mockDriveData = {
    categories: [
        { id: 'boxers', name: 'Boxers' },
        { id: 'bralettes', name: 'Bralettes' },
        { id: 'complementos', name: 'Complementos' },
        { id: 'deportivo', name: 'Deportivo' },
        { id: 'invierno', name: 'Invierno' },
        { id: 'lenceria', name: 'Lenceria' },
        { id: 'medias', name: 'Medias' },
        { id: 'packs', name: 'Packs' },
        { id: 'verano', name: 'Verano' },
        { id: 'atrevidas', name: 'Atrevidas' },
        { id: 'pijamas', name: 'Pijamas' },
    ],
    products: [
        // Boxers
        { id: 'box1', categoryId: 'boxers', name: 'Boxer Clásico 1', code: 'BOX-001', price: 8500, image: '/suria/products/Boxer/Boxer_1.png' },
        { id: 'box2', categoryId: 'boxers', name: 'Boxer Clásico 2', code: 'BOX-002', price: 8500, image: '/suria/products/Boxer/Boxer_2.png' },
        { id: 'box3', categoryId: 'boxers', name: 'Boxer Clásico 3', code: 'BOX-003', price: 8500, image: '/suria/products/Boxer/Boxer_3.png' },
        { id: 'box4', categoryId: 'boxers', name: 'Boxer Clásico 4', code: 'BOX-004', price: 8500, image: '/suria/products/Boxer/Boxer_4.png' },

        // Bralettes
        { id: 'bra1', categoryId: 'bralettes', name: 'Bralette Encaje 1', code: 'BRA-001', price: 12000, image: '/suria/products/Bralettes/Bralette_1.png' },
        { id: 'bra2', categoryId: 'bralettes', name: 'Bralette Encaje 2', code: 'BRA-002', price: 12000, image: '/suria/products/Bralettes/Bralette_2.png' },
        { id: 'bra3', categoryId: 'bralettes', name: 'Bralette Encaje 3', code: 'BRA-003', price: 12000, image: '/suria/products/Bralettes/Bralette_3.png' },

        // Complementos
        { id: 'comp1', categoryId: 'complementos', name: 'Complemento 1', code: 'CMP-001', price: 5000, image: '/suria/products/Complementos/Complemento_1.png' },
        { id: 'comp2', categoryId: 'complementos', name: 'Complemento 2', code: 'CMP-002', price: 5000, image: '/suria/products/Complementos/Complemento_2.png' },
        { id: 'comp3', categoryId: 'complementos', name: 'Complemento 3', code: 'CMP-003', price: 5000, image: '/suria/products/Complementos/Complemento_3.png' },

        // Deportivo (Folder: Depotivo)
        { id: 'dep1', categoryId: 'deportivo', name: 'Conjunto Deportivo 1', code: 'DEP-001', price: 18000, image: '/suria/products/Depotivo/Deportivo_1.png' },
        { id: 'dep2', categoryId: 'deportivo', name: 'Conjunto Deportivo 2', code: 'DEP-002', price: 18000, image: '/suria/products/Depotivo/Deportivo_2.png' },
        { id: 'dep3', categoryId: 'deportivo', name: 'Conjunto Deportivo 3', code: 'DEP-003', price: 18000, image: '/suria/products/Depotivo/Deportivo_3.png' },
        { id: 'dep4', categoryId: 'deportivo', name: 'Conjunto Deportivo 4', code: 'DEP-004', price: 18000, image: '/suria/products/Depotivo/Deportivo_4.png' },

        // Invierno (Pantuflas)
        { id: 'inv1', categoryId: 'invierno', name: 'Pantufla Soft 1', code: 'INV-001', price: 15000, image: '/suria/products/Invierno/Pantufla_1.png' },
        { id: 'inv2', categoryId: 'invierno', name: 'Pantufla Soft 2', code: 'INV-002', price: 15000, image: '/suria/products/Invierno/Pantufla_2.png' },
        { id: 'inv3', categoryId: 'invierno', name: 'Pantufla Soft 3', code: 'INV-003', price: 15000, image: '/suria/products/Invierno/Pantufla_3.png' },
        { id: 'inv4', categoryId: 'invierno', name: 'Pantufla Soft 4', code: 'INV-004', price: 15000, image: '/suria/products/Invierno/Pantufla_4.png' },

        // Lenceria
        { id: 'len1', categoryId: 'lenceria', name: 'Conjunto Lencería 1', code: 'LEN-001', price: 16500, image: '/suria/products/Lenceria/lenceria_1.png' },
        { id: 'len2', categoryId: 'lenceria', name: 'Conjunto Lencería 2', code: 'LEN-002', price: 16500, image: '/suria/products/Lenceria/lenceria_2.png' },
        { id: 'len3', categoryId: 'lenceria', name: 'Conjunto Lencería 3', code: 'LEN-003', price: 16500, image: '/suria/products/Lenceria/lenceria_3.png' },
        { id: 'len4', categoryId: 'lenceria', name: 'Conjunto Lencería 4', code: 'LEN-004', price: 16500, image: '/suria/products/Lenceria/lenceria_4.png' },
        { id: 'len5', categoryId: 'lenceria', name: 'Conjunto Lencería 5', code: 'LEN-005', price: 16500, image: '/suria/products/Lenceria/lenceria_5.png' },
        { id: 'len6', categoryId: 'lenceria', name: 'Conjunto Lencería 6', code: 'LEN-006', price: 16500, image: '/suria/products/Lenceria/lenceria_6.png' },
        { id: 'len7', categoryId: 'lenceria', name: 'Conjunto Lencería 7', code: 'LEN-007', price: 16500, image: '/suria/products/Lenceria/lenceria_7.png' },

        // Medias
        { id: 'med1', categoryId: 'medias', name: 'Media Diseño 1', code: 'MED-001', price: 3500, image: '/suria/products/Medias/medias_1.png' },
        { id: 'med2', categoryId: 'medias', name: 'Media Diseño 2', code: 'MED-002', price: 3500, image: '/suria/products/Medias/medias_2.png' },
        { id: 'med3', categoryId: 'medias', name: 'Media Diseño 3', code: 'MED-003', price: 3500, image: '/suria/products/Medias/medias_3.png' },
        { id: 'med4', categoryId: 'medias', name: 'Media Diseño 4', code: 'MED-004', price: 3500, image: '/suria/products/Medias/medias_4.png' },
        { id: 'med5', categoryId: 'medias', name: 'Media Diseño 5', code: 'MED-005', price: 3500, image: '/suria/products/Medias/medias_5.png' },

        // Packs
        { id: 'pack1', categoryId: 'packs', name: 'Pack Bombachas 1', code: 'PCK-001', price: 10500, image: '/suria/products/Packs/pack_1.png' },
        { id: 'pack2', categoryId: 'packs', name: 'Pack Bombachas 2', code: 'PCK-002', price: 10500, image: '/suria/products/Packs/pack_2.png' },
        { id: 'pack3', categoryId: 'packs', name: 'Pack Bombachas 3', code: 'PCK-003', price: 10500, image: '/suria/products/Packs/pack_3.png' },
        { id: 'pack4', categoryId: 'packs', name: 'Pack Bombachas 4', code: 'PCK-004', price: 10500, image: '/suria/products/Packs/pack_4.png' },
        { id: 'pack5', categoryId: 'packs', name: 'Pack Bombachas 5', code: 'PCK-005', price: 10500, image: '/suria/products/Packs/pack_5.png' },
        { id: 'pack6', categoryId: 'packs', name: 'Pack Bombachas 6', code: 'PCK-006', price: 10500, image: '/suria/products/Packs/pack_6.png' },

        // Verano (Bikinis)
        { id: 'ver1', categoryId: 'verano', name: 'Bikini Summer 1', code: 'VER-001', price: 22000, image: '/suria/products/verano/Bikini_1.png' },
        { id: 'ver2', categoryId: 'verano', name: 'Bikini Summer 2', code: 'VER-002', price: 22000, image: '/suria/products/verano/bikini_2.png' },
        { id: 'ver3', categoryId: 'verano', name: 'Bikini Summer 3', code: 'VER-003', price: 22000, image: '/suria/products/verano/bikini_3.png' },

        // Atrevidas
        { id: 'atr1', categoryId: 'atrevidas', name: 'Conjunto Atrevida 1', code: 'ATR-001', price: 19000, image: '/suria/products/Atrevidas/Atrevida_1.png' },
        { id: 'atr2', categoryId: 'atrevidas', name: 'Conjunto Atrevida 2', code: 'ATR-002', price: 19000, image: '/suria/products/Atrevidas/Atrevida_2.png' },
        { id: 'atr3', categoryId: 'atrevidas', name: 'Conjunto Atrevida 3', code: 'ATR-003', price: 19000, image: '/suria/products/Atrevidas/Atrevida_3.png' },

        // Pijamas
        { id: 'pij1', categoryId: 'pijamas', name: 'Pijama Soft 1', code: 'PIJ-001', price: 25000, image: '/suria/products/Pijamas/pijama_1.png' },
        { id: 'pij2', categoryId: 'pijamas', name: 'Pijama Soft 2', code: 'PIJ-002', price: 25000, image: '/suria/products/Pijamas/pijama_2.png' },
        { id: 'pij3', categoryId: 'pijamas', name: 'Pijama Soft 3', code: 'PIJ-003', price: 25000, image: '/suria/products/Pijamas/pijama_3.png' },
        { id: 'pij4', categoryId: 'pijamas', name: 'Pijama Soft 4', code: 'PIJ-004', price: 25000, image: '/suria/products/Pijamas/pijama_4.png' },
        { id: 'pij5', categoryId: 'pijamas', name: 'Pijama Soft 5', code: 'PIJ-005', price: 25000, image: '/suria/products/Pijamas/pijama_5.png' },
        { id: 'pij6', categoryId: 'pijamas', name: 'Pijama Soft 6', code: 'PIJ-006', price: 25000, image: '/suria/products/Pijamas/pijama_6.png' },
    ]
};
