export default function Input({ label, type = "text", placeholder, value, onChange, icon: Icon, className = "" }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && <label className="text-sm text-gray-400 font-medium ml-1">{label}</label>}
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-500 transition-colors">
                        <Icon />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full bg-black/20 border border-white/10 rounded-xl py-3 ${Icon ? 'pl-12' : 'pl-4'} pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all`}
                />
            </div>
        </div>
    );
}
