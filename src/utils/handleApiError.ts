import { AxiosError } from "axios";
import { getFriendlyErrorMessage } from "./errorMessage";
import { IToasterState } from "@/contexts/ToasterContexts";
import { NextRouter } from "next/router"; // ✅ pakai NextRouter tipe router

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

        // await signOut({ callbackUrl: "/auth/login" });
        // return;

        const currentUrl = router.asPath;
        router.push(
            `/auth/login?sessionExpired=true&callbackUrl=${encodeURIComponent(currentUrl)}`
        );
        return;
    }

    showToaster({ type: "error", message: friendlyMessage });
};
