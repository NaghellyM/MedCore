import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, Home } from "lucide-react";
import { Button } from "../components/ui/button";

const ECG = () => (
    <motion.svg
        width="100%"
        height="80"
        viewBox="0 0 800 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-70"
    >
        <motion.path
            d="M0 40 H80 L120 10 L140 70 L160 40 H220 L260 20 L280 60 L300 40 H380 L420 10 L440 70 L460 40 H520 L560 25 L580 55 L600 40 H680 L720 15 L740 65 L760 40 H800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
            className="text-rose-500"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
    </motion.svg>
);

const NotFoundPage: React.FC = () => {
    return (
        <main className="min-h-screen w-full bg-gradient-to-b from-sky-50 via-white to-emerald-50 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl border border-slate-200 overflow-hidden"
                >
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-10">
                            <div className="flex items-center gap-3 text-sky-700">
                                <Stethoscope className="h-6 w-6" />
                                <span className="uppercase tracking-wider text-xs font-semibold">Cuidarte</span>
                            </div>
                            <h1 className="mt-4 text-5xl font-black leading-tight">
                                <span className="block text-slate-900">404</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">
                                    Página no encontrada
                                </span>
                            </h1>
                            <p className="mt-4 text-slate-600">
                                La ruta que buscaste no existe o cambió.
                            </p>
                        </div>

                        {/* Right: Illustration */}
                        <div className="relative bg-gradient-to-br from-sky-100 to-emerald-100 p-6 md:p-10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.15),transparent_60%)]" />
                            <div className="relative">
                                <ECG />
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-4 bg-white shadow-md rounded-xl p-4 border border-slate-200"
                                >
                                    <div className="grid grid-cols-1 gap-3 text-center">
                                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                                            <Button asChild className="h-11 rounded-xl bg-sky-100">
                                                <a href="/" className="inline-flex items-center gap-2">
                                                    <Home className="h-4 w-4" />
                                                    Volver al inicio
                                                </a>
                                            </Button>
                                        </div>

                                        <div className="grid mt-4 text-xs text-slate-500 place-items-center gap-1">
                                            Consejo: verifica la URL o utiliza el menú de navegación.
                                        </div>
                                    </div>

                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <p className="mt-6 text-center text-xs text-slate-500">
                    Código: <span className="font-mono">ERR_404_NOT_FOUND</span>
                </p>
            </div>
        </main>
    );
};

export default NotFoundPage;