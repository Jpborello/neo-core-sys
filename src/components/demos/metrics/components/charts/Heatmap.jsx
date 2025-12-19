import { useDashboard } from '../../context/DashboardContext';

export default function Heatmap() {
    const { heatmapData } = useDashboard();

    const getColor = (value) => {
        if (value >= 80) return "bg-pink-500";
        if (value >= 60) return "bg-violet-500";
        if (value >= 40) return "bg-indigo-500";
        if (value >= 20) return "bg-blue-500";
        return "bg-gray-800";
    };

    return (
        <div className="grid grid-cols-5 gap-2">
            {heatmapData.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                    <div
                        className={`w-full aspect-square rounded-lg ${getColor(item.value)} transition-all hover:scale-110 cursor-pointer relative group`}
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-white">{item.value}%</span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-500">{item.hour}</span>
                </div>
            ))}
        </div>
    );
}
