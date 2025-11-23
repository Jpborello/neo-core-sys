export default function Input({ label, type = "text", ...props }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 ml-1">{label}</label>
            <input
                type={type}
                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-[#7b3fe4] focus:ring-2 focus:ring-[#7b3fe4]/20 outline-none transition-all text-gray-800 font-medium"
                {...props}
            />
        </div>
    );
}
