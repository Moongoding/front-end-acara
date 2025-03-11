import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import { object } from "yup";

const Register = () => {
    const {
        visiblePassword,
        handleVisiblePassword,
        control,
        handleSubmit,
        handleRegister,
        isPendingRegister,
        errors
    } = useRegister();
    
    return (
        <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-10 lg:gap-20 px-4">
            {/* Bagian Kiri (Logo & Ilustrasi) */}
            <div className="flex w-full lg:w-1/3 flex-col items-center gap-6">
                <Image
                    src="/images/general/logo.svg"
                    alt="Company Logo"
                    className="w-32 md:w-40"
                    width={180}
                    height={180}
                />
                <Image
                    src="/images/ilustrations/login.svg"
                    alt="Company Login"
                    className="max-w-[80%] lg:max-w-full"
                    width={1024}
                    height={1024}
                />
            </div>

            {/* Bagian Kanan (Form Registrasi) */}
            <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg">
                <CardBody className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-danger">Create Account</h2>
                    <p className="text-sm mb-4">
                        Have an account?&nbsp;
                        <Link href="/auth/login" legacyBehavior>
                            <a className="font-semibold text-danger-400 hover:underline">Login here</a>
                        </Link>
                    </p>

                    {errors.root && (
                        <p className="mb-2 font-medium text-danger">
                            {errors?.root?.message}
                        </p>
                    )}
                    
                    <form className={cn("flex flex-col",Object.keys(errors).length>0 ?"gap-2":"gap-4")} onSubmit={handleSubmit(handleRegister)}>
                        <Controller name="fullName" control={control} render={({field}) => (
                            <Input {...field} type="text" label="Fullname" variant="bordered" autoComplete="off"
                                isInvalid={errors.fullName !== undefined} errorMessage={errors.fullName?.message} />
                        )} />
                        <Controller name="username" control={control} render={({field}) => (
                            <Input {...field} type="text" label="Username" variant="bordered" autoComplete="off"
                                isInvalid={errors.username !== undefined} errorMessage={errors.username?.message}/>
                        )} />
                        <Controller name="email" control={control} render={({field}) => (
                            <Input {...field} type="email" label="Email" variant="bordered" autoComplete="off"
                                isInvalid={errors.email !== undefined} errorMessage={errors.email?.message}/>
                        )} />
                        <Controller name="password" control={control} render={({field}) => (
                            <Input  
                            {...field}
                            isInvalid={errors.password !== undefined} errorMessage={errors.password?.message}
                            type={visiblePassword.password ? "text" : "password"}
                            label="Password" 
                            variant="bordered" 
                            autoComplete="off"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={() => handleVisiblePassword("password")}>
                                    {visiblePassword.password 
                                        ? <FaEye className="pointer-events-none text-xl text-default-400" /> 
                                        : <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                                    }
                                </button>
                            } 
                        />
                        )}/>
                        <Controller name="confirmPassword" control={control} render={({field}) => (
                            <Input  
                            {...field}
                            isInvalid={errors.confirmPassword !== undefined} errorMessage={errors.confirmPassword?.message}
                            type={visiblePassword.passwordConfirmation ? "text" : "password"}
                            label="Password Confirmation" 
                            variant="bordered" 
                            autoComplete="off"
                            endContent={
                                <button
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={() => handleVisiblePassword("passwordConfirmation")}>
                                    {visiblePassword.passwordConfirmation 
                                        ? <FaEye className="pointer-events-none text-xl text-default-400" /> 
                                        : <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                                    }
                                </button>
                            } 
                        />
                        )} />

                        <Button color="danger" size="lg" type="submit" className="mt-4">
                            {isPendingRegister ? (
                                <Spinner color="white" size="md"/>
                            ): "Register"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Register;
