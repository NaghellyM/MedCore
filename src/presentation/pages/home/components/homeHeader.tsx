import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-16 md:h-20 items-center justify-between">
                    <div className="flex items-center flex-shrink-0">
                        <img
                            src="/logoCuidarte.png"
                            alt="logo-cuidarte"
                            className="w-10 h-10 md:w-14 md:h-14 object-contain"
                        />
                        <div className="hidden md:flex ml-4 text-2xl font-bold text-cuidarte-primary">
                            <h1 className="text-center">Cuidarte</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-cuidarte-accent text-white px-4 py-2 rounded-md hover:bg-cuidarte-accent-dark"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
