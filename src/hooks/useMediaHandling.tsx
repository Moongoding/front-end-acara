import { ToasterContext } from "@/contexts/ToasterContexts";
import uploadServices from "@/services/upload.Services";
import { getFriendlyErrorMessage } from "@/utils/errorMessage";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";

const useMediaHandling = () => {
    const router = useRouter();
    const { showToaster } = useContext(ToasterContext);
    const uploadIcon = async (
        file: File,
        callback: (fileUrl: string) => void,
    ) => {
        const formData = new FormData();
        formData.append("file", file);

        const {
            data: { data: { secure_url: icon } },
        } = await uploadServices.uploadFile(formData);
        callback(icon);
    };

    const { mutate: mutateUploadFile, isPending: isPandingUploadFile, } =
        useMutation({
            mutationFn: (variables: {
                file: File,
                callback: (fileUrl: string) => void
            }) => uploadIcon(variables.file, variables.callback),
            onError: (error: any) => {
                const friendlyMessage = getFriendlyErrorMessage(error);
                if (error?.response?.status === 500 || friendlyMessage.includes("token")) {
                    showToaster({ type: "error", message: "Sesi Anda telah habis. Silakan login ulang." });
                    // Redirect ke login atau panggil logout
                    signOut(); // atau logout()
                } else {
                    showToaster({ type: "error", message: friendlyMessage });
                }
            },
            onSuccess: () => {
                showToaster({ type: "success", message: "File uploaded successfully!" });
            }
        });

    const deleteIcon = async (fileUrl: string, callback: () => void) => {
        const res = await uploadServices.deleteFile({ fileUrl });
        if (res.data.meta.status === 200) {
            callback();
        };
    };

    const { mutate: mutateDeleteFile, isPending: isPandingDeleteFile, } =
        useMutation({
            mutationFn: (variables: {
                fileUrl: string,
                callback: () => void
            }) => deleteIcon(variables.fileUrl, variables.callback),
            onError: (error) => {
                const friendlyMessage = getFriendlyErrorMessage(error);
                showToaster({ type: "error", message: friendlyMessage });
            },
            onSuccess: () => {
                showToaster({ type: "success", message: "File deleted successfully!" });
            }
        });

    return {
        mutateUploadFile,
        isPandingUploadFile,
        mutateDeleteFile,
        isPandingDeleteFile
    };
};

export default useMediaHandling;

