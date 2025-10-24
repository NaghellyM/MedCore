// src/features/profile/pages/ProfilePage.tsx
import React from 'react';
import VerifyEmailCard from '../user/components/verifyEmailCard';
import { useAuth } from '../../../core/context/authContext';

const ProfilePage: React.FC = () => {
    const { user } = useAuth(); // { email, name, emailVerified, role, ... }

    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-bold">Mi perfil</h1>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Datos del usuario */}
                <div className="bg-white p-5 rounded-xl shadow lg:col-span-2">
                    <h2 className="text-lg font-semibold">Información</h2>
                    <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <dt className="text-sm text-gray-500">Nombre</dt>
                            <dd className="text-sm font-medium text-gray-900">{user?.name || '—'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Rol</dt>
                            <dd className="text-sm font-medium text-gray-900">{user?.role || '—'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Correo</dt>
                            <dd className="text-sm font-medium text-gray-900">{user?.email || '—'}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Estado de correo</dt>
                            <dd className="text-sm font-medium text-gray-900">
                                {user?.emailVerified ? 'Verificado' : 'No verificado'}
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Verificación de correo */}
                <VerifyEmailCard
                    initialEmail={user?.email}
                    initialVerified={!!user?.emailVerified}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
