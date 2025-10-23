import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from "lucide-react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { loginSchema } from '../../../core/validators/validationLogin';
import { useAuth } from '../../../core/context/authContext';
import type { IFormInput } from '../../../core/types/types';

import FormInput from '../../components/globals/input';
import FormButton from '../../components/globals/button';
import LoginVerification from './components/loginVerification';

type Role = 'admin' | 'doctor' | 'nurse' | 'patient';

const Form: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(v => !v);

  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [needsVerification, setNeedsVerification] = useState<boolean>(false);

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const goToRoleHome = (role: Role | undefined) => {
    const dest =
      role === 'admin' ? '/adminPage' :
        role === 'doctor' ? '/doctorPage' :
          role === 'nurse' ? '/nursePage' :
            '/patientPage';
    navigate(dest, { replace: true });
  };

  const onSubmit = async (data: IFormInput) => {
    try {
      const res: any = await loginUser({ email: data.email, password: data.password });

      if (res?.message && String(res.message).toLowerCase().includes("email")) {
        setEmail(data.email);
        setNeedsVerification(true);
        return;
      }

      const redirect = params.get('redirect');
      if (redirect && redirect !== '/login') {
        navigate(redirect, { replace: true });
        return;
      }

      const role: Role | undefined = res?.user?.role;
      goToRoleHome(role);
    } catch (err: any) {
      const errorMessage = err?.message || err?.toString() || "Error al iniciar sesión";
      Swal.fire({ icon: 'warning', title: '', text: errorMessage });
    }
  };

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 min-h-screen  items-center justify-center px-4 sm:px-6 lg:px-8">
      <img
        src="/logoCuidarte.png"
        alt="logo-cuidarte"
        className="w-30 h-30 "
      />

      <div className="w-full max-w-[22rem] sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-center font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-gray-900">
          Bienvenidos a Cuidarte
        </h1>



        <div className="mt-6 sm:mt-8 bg-white p-5 sm:p-7 lg:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <FormInput
              name="email"
              label="Correo Electrónico"
              control={control}
              error={errors.email}
            />

            <div className="relative">
              <FormInput
                name="password"
                label="Contraseña"
                type={isVisible ? "text" : "password"}
                control={control}
                error={errors.password}
              />
              <button
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
                aria-pressed={isVisible}
                className="absolute inset-y-0 right-2.5 mt-[1.625rem] sm:mt-[1.875rem] flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {isVisible ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
              </button>
            </div>

            <FormButton type="submit" label="Iniciar sesión" />
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-red-100 text-black py-2 font-semibold rounded-md"
            >
              Regresar
            </button>
          </form>

          {needsVerification && (
            <div className="mt-6 sm:mt-8">
              <LoginVerification email={email} code={code} setCode={setCode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
