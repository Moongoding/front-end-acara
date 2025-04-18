import { useContext, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { ToasterContext } from "@/contexts/ToasterContexts";
import { useEffect } from "react";
import { handleApiError } from "@/utils/handleApiError";
import { getFriendlyErrorMessage } from "@/utils/errorMessage";


const loginSchema = Yup.object().shape({
  indentifier: Yup.string().required("Please input your email or username"),
  password: Yup.string().required("Please input your Password"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { showToaster } = useContext(ToasterContext);

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  useEffect(() => {
    const sessionExpired = router.query.sessionExpired;
    if (sessionExpired === "true") {
      showToaster({
        type: "warning",
        message: "Your session has expired. Please log in again.",
      });
    }
  }, [router.query.sessionExpired, showToaster]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });
    if (result?.error && result?.status === 401) {
      throw new Error("Email or username not match with your password");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: async (error) => {
      await handleApiError(error, showToaster, router);
      setError("root", {
        message: getFriendlyErrorMessage(error),
      });
    },
    onSuccess: () => {
      // setToaster({
      //   type: 'succes',
      //   message: 'Login Succses'
      // })
      reset();
      showToaster({ type: "success", message: "Login Success!" });
      router.push(callbackUrl);
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
