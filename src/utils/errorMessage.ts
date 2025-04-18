import { AxiosError } from "axios";

export const getFriendlyErrorMessage = (error: unknown): string => {
    if (typeof error === "string") return error;

    if (error instanceof AxiosError) {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message || error.message;

        switch (status) {
            case 400:
                return "Invalid data. Please double check your information.";
            case 401:
                return "You do not have authorization. Please log in again.";
            case 403:
                return "You do not have permission to perform this action. Please log in again";
            case 404:
                return "Resource not found.";
            case 500:
                return "An error occurred on the server. Please try again later.";
            default:
                return serverMessage || "An error occurred. Please try again.";
        }
    }

    // fallback error dengan property `message`
    if (error && typeof error === "object" && "message" in error) {
        return (error as any).message;
    }

    return "Terjadi kesalahan. Silakan coba lagi.";
};
