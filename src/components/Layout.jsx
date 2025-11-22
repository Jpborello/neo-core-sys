import StarBackground from "./StarBackground";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="relative min-h-screen text-white bg-black overflow-x-hidden font-sans">
            <StarBackground />
            <Navbar />
            <div className="pt-20">
                {children}
            </div>
        </div>
    );
}
