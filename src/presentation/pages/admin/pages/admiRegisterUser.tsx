import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserForm } from "../components/adminUserForm";
import { registerUser } from "../../../../core/services/patientService";
import type { RegisterUserDto } from "../../../../core/models/user";
import { validationSchema } from "../../../../core/validators/validationSchema";

export function AdminRegisterUser() {
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, reset, formState: { errors } } =
        useForm<RegisterUserDto>({
            resolver: yupResolver(validationSchema),
            defaultValues: {
                email: "",
                fullname: "",
                current_password: "",
                role: "PACIENTE",
            },
        });

    const onSubmit = async (data: RegisterUserDto) => {
        setLoading(true);
        try {
            await registerUser(data);
            Swal.fire({
                icon: "success",
                title: "Usuario registrado con éxito",
                showConfirmButton: false,
                timer: 2000,
            });
            reset();
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "No se pudo registrar",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 w-full max-w-md mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Registrar Usuario</h2>
            <UserForm
                control={control}
                onSubmit={handleSubmit(onSubmit)}
                errors={errors}
                loading={loading}
            />
        </div>
    );
}
