import { useDashboard } from "@/context/DashboardContext";
import Card from "../../turnos/components/ui/Card"; // Reusing Card
import Button from "../../turnos/components/ui/Button"; // Reusing Button
import Input from "../../turnos/components/ui/Input"; // Reusing Input

export default function Settings() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white mb-1">Configuración</h2>
                <p className="text-gray-400">Ajustes del panel de métricas</p>
            </div>

            <Card>
                <h3 className="text-xl font-bold text-white mb-6">Objetivos Mensuales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Input label="Meta de Ingresos ($)" placeholder="50000" />
                    <Input label="Meta de Turnos" placeholder="150" />
                </div>
                <Button>Guardar Objetivos</Button>
            </Card>

            <Card>
                <h3 className="text-xl font-bold text-white mb-6">Exportar Datos</h3>
                <p className="text-gray-400 mb-6">Descarga tus reportes en formato CSV o PDF para análisis externo.</p>
                <div className="flex gap-4">
                    <Button variant="secondary">Exportar CSV</Button>
                    <Button variant="secondary">Exportar PDF</Button>
                </div>
            </Card>
        </div>
    );
}
