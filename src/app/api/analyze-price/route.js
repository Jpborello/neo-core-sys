import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { productName, currentPrice, scrapingResults } = await request.json();

        // Validación de entrada
        if (!productName || !currentPrice || !scrapingResults) {
            return NextResponse.json(
                { error: 'Faltan parámetros requeridos' },
                { status: 400 }
            );
        }

        // Formatear resultados de scraping para el prompt
        const formattedResults = scrapingResults.map(source => {
            const items = source.items.map(item =>
                `  - ${item.title}: $${item.price} (${item.link})`
            ).join('\n');
            return `${source.source}:\n${items}`;
        }).join('\n\n');

        // Construir prompt optimizado
        const prompt = `Eres un analista de precios experto para distribuidoras en Argentina.

PRODUCTO ANALIZADO: ${productName}
PRECIO ACTUAL DEL CLIENTE: $${currentPrice}

RESULTADOS DE BÚSQUEDA EN COMPETIDORES:
${formattedResults}

INSTRUCCIONES:
1. Identifica cuáles de los resultados coinciden REALMENTE con el producto "${productName}" (ignora accesorios, combos o productos diferentes)
2. De los productos válidos, calcula:
   - Precio mínimo encontrado
   - Precio promedio del mercado
   - Precio máximo encontrado
3. Compara el precio actual ($${currentPrice}) con el promedio y clasifícalo como:
   - "Competitivo" si está dentro del ±10% del promedio
   - "Barato" si está más de 10% por debajo del promedio
   - "Costoso" si está más de 10% por encima del promedio
4. Redacta UNA recomendación comercial directa y accionable (máximo 20 palabras) para el dueño
5. Asigna un nivel de confianza (0-100) basado en la cantidad y calidad de coincidencias

RESPONDE ÚNICAMENTE CON ESTE JSON (sin markdown, sin bloques de código):
{
  "posicion_mercado": "Competitivo|Barato|Costoso",
  "precio_min": 0,
  "precio_promedio": 0,
  "precio_max": 0,
  "recomendacion": "texto de máximo 20 palabras",
  "confianza_analisis": 0
}`;

        // Llamada a Groq API usando fetch
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "Eres un asistente que SOLO responde con JSON válido, sin markdown ni explicaciones adicionales."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.3,
                max_tokens: 512,
                top_p: 1
            })
        });

        if (!groqResponse.ok) {
            const errorText = await groqResponse.text();
            console.error('Groq API Error:', errorText);
            throw new Error(`Groq API error: ${groqResponse.status}`);
        }

        const groqData = await groqResponse.json();

        // Extraer y parsear respuesta
        let responseText = groqData.choices[0]?.message?.content || '';

        // Limpiar markdown si viene envuelto en ```json
        responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        const analysisData = JSON.parse(responseText);

        // Validar estructura de respuesta
        if (!analysisData.posicion_mercado || !analysisData.recomendacion) {
            throw new Error('Respuesta de Groq con formato inválido');
        }

        // Generar lista de competidores basada en los resultados
        const competidores = scrapingResults.slice(0, 3).map(source => ({
            name: source.source,
            price: source.items[0]?.price || 0,
            source: source.source.includes('Libre') ? 'Marketplace' :
                source.source.includes('Carrefour') || source.source.includes('Coto') ? 'Web' : 'Local'
        }));

        // Mapear tipo de posición al formato esperado por el frontend
        const typeMap = {
            'Competitivo': 'optimal',
            'Barato': 'underpriced',
            'Costoso': 'overpriced'
        };

        // Construir respuesta final
        const response = {
            type: typeMap[analysisData.posicion_mercado] || 'optimal',
            marketAvg: Math.round(analysisData.precio_promedio),
            minPrice: Math.round(analysisData.precio_min),
            maxPrice: Math.round(analysisData.precio_max),
            recommendation: analysisData.recomendacion,
            confidence: analysisData.confianza_analisis,
            competitors: competidores,
            color: typeMap[analysisData.posicion_mercado] === 'optimal' ? 'text-blue-400' :
                typeMap[analysisData.posicion_mercado] === 'underpriced' ? 'text-emerald-400' : 'text-red-400'
        };

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error en análisis de precios:', error);

        // Fallback a datos simulados en caso de error
        return NextResponse.json(
            {
                error: 'Error al procesar análisis',
                message: error.message,
                useFallback: true
            },
            { status: 500 }
        );
    }
}
