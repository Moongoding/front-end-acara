import { useState } from "react";
import * as Yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.Services";
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router";

const registerSchema = Yup.object().shape({
    fullName: Yup.string().required('Please input your Fullname'),
    username: Yup.string().min(3, 'Username must be at least 3 characters').required('Please input your Username'),
    email: Yup.string().email('Invalid email format').required('Please input your Email'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Please input your Password'),
    // confirmPassword: Yup.string().required(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required(),

});

const useRegister = () => {
    const router = useRouter();
    const [visiblePassword, setVisiblePassword] = useState({
        password: false,
        passwordConfirmation: false
    });

    const handleVisiblePassword = (key: "password" | "passwordConfirmation"
    ) => {
        setVisiblePassword({
            ...visiblePassword,
            [key]: !visiblePassword[key],
        });
    };
    const {
        control, handleSubmit,
        formState: { errors },
        reset, setError
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const registerService = async (payload: IRegister) => {
        const result = await authServices.register(payload);
        return result;
    }

    const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
        mutationFn: registerService,
        onError(error) {
            setError("root", {
                message: error.message,
            });
        },
        onSuccess: () => {
            router.push("/auth/register/success");
            reset();
        },
    });

    const handleRegister = (data: IRegister) => mutateRegister(data)

    return {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors
    };
};

export default useRegister