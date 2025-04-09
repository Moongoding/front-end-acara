import { AxiosError } from "axios";

export const getFriendlyErrorMessage = (error: unknown): string => {
    if (typeof error === "string") return error;

    if (error instanceof AxiosError) {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message || error.message;

        switch (status) {
            case 400:
                return "Data tidak valid. Silakan periksa kembali isian Anda.";
            case 401:
                return "Anda tidak memiliki otorisasi. Silakan login kembali.";
            case 403:
                return "Anda tidak memiliki izin untuk melakukan aksi ini.";
            case 404:
                return "Sumber daya tidak ditemukan.";
            case 500:
                return "Terjadi kesalahan pada server. Silakan coba beberapa saat lagi.";
            default:
                return serverMessage || "Terjadi kesalahan. Silakan coba lagi.";
        }
    }

    // fallback error dengan property `message`
    if (error && typeof error === "object" && "message" in error) {
        return (error as any).message;
    }

    return "Terjadi kesalahan. Silakan coba lagi.";
};
