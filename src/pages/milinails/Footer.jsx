import logo from "../../assets/milinails_logo.png";

export default function Footer() {
    return (
        <footer className="bg-black py-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="MiliNails" className="h-10 w-auto opacity-70 grayscale hover:grayscale-0 transition-all" />
                    <span className="text-gray-500 text-sm tracking-widest">© {new Date().getFullYear()}</span>
                </div>

                <div className="text-gray-600 text-xs">
                    Diseñado por <span className="text-gray-400">Neo-Core-Sys</span>
                </div>
            </div>
        </footer>
    );
}
