import { AxiosError } from "axios";
import { getFriendlyErrorMessage } from "./errorMessage";
import { IToasterState } from "@/contexts/ToasterContexts";
import { NextRouter } from "next/router"; // ✅ pakai NextRouter tipe router
import { signOut } from "next-auth/react";

export const handleApiError = async (
    error: unknown,
    showToaster: IToasterState["showToaster"],
    router: NextRouter // ✅ diterima dari luar
) => {
    const err = error as AxiosError;
    const status = err.response?.status;
    const friendlyMessage = getFriendlyErrorMessage(error);

    if (status === 401 || status === 403 || status === 500) {
        showToaster({
            type: "warning",
            message: friendlyMessage,
        });

        const currentUrl = router.asPath;
        await signOut({ callbackUrl: `/auth/login?sessionExpired=true&callbackUrl=${encodeURIComponent(currentUrl)}` });
        return;

        // router.push(
        //     `/auth/login?sessionExpired=true&callbackUrl=${encodeURIComponent(currentUrl)}`
        // );
        return;
    }

    showToaster({ type: "error", message: friendlyMessage });
};
