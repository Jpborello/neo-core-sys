import React from 'react';

const SuriaAdmin = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="font-serif text-3xl mb-8">Panel de Administración (Demo)</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left border-b">ID Pedido</th>
                            <th className="py-3 px-4 text-left border-b">Cliente</th>
                            <th className="py-3 px-4 text-left border-b">Fecha</th>
                            <th className="py-3 px-4 text-left border-b">Total</th>
                            <th className="py-3 px-4 text-left border-b">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-3 px-4 border-b">#1023</td>
                            <td className="py-3 px-4 border-b">María Pérez</td>
                            <td className="py-3 px-4 border-b">28/11/2025</td>
                            <td className="py-3 px-4 border-b">$45.000</td>
                            <td className="py-3 px-4 border-b"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pendiente</span></td>
                        </tr>
                        <tr>
                            <td className="py-3 px-4 border-b">#1022</td>
                            <td className="py-3 px-4 border-b">Laura Gómez</td>
                            <td className="py-3 px-4 border-b">27/11/2025</td>
                            <td className="py-3 px-4 border-b">$12.500</td>
                            <td className="py-3 px-4 border-b"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Entregado</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuriaAdmin;
