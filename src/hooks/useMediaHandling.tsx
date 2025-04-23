import { ToasterContext } from "@/contexts/ToasterContexts";
import uploadServices from "@/services/upload.Services";
import { handleApiError } from "@/utils/handleApiError";
import { validateImageFile } from "@/utils/mediaValidate";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";


const useMediaHandling = () => {
    //  1. Utility function 
    const router = useRouter();
    const { showToaster } = useContext(ToasterContext);

    // ✅ 2. Fungsi API - Upload file
    const uploadFile = async (
        file: File,
        callback: (fileUrl: string) => void,
    ) => {
        const formData = new FormData();
        formData.append("file", file);

        const {
            data: { data: { secure_url: fileUrl } },
        } = await uploadServices.uploadFile(formData);
        callback(fileUrl);
    };

    // ✅ 3. Fungsi API - Delete file
    const deleteFile = async (fileUrl: string, callback: () => void) => {
        const res = await uploadServices.deleteFile({ fileUrl });
        if (res.data.meta.status === 200) {
            callback();
        };
    };

    // ✅ 4. React Query - Mutation untuk upload file
    const {
        mutate: mutateUploadFile,
        isPending: isPendingUploadFile,
    } = useMutation({
        mutationFn: (variables: {
            file: File,
            callback: (fileUrl: string) => void
        }) => uploadFile(variables.file, variables.callback),
        // onError: (error: any) => {
        //     const friendlyMessage = getFriendlyErrorMessage(error);
        //     showToaster({ type: "error", message: friendlyMessage });

        // },
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            showToaster({ type: "success", message: "File uploaded successfully!" });
        }
    });

    // ✅ 5. React Query - Mutation untuk delete file
    const { mutate: mutateDeleteFile, isPending: isPendingDeleteFile, } =
        useMutation({
            mutationFn: (variables: {
                fileUrl: string,
                callback: () => void
            }) => deleteFile(variables.fileUrl, variables.callback),
            // onError: (error) => {
            //     const friendlyMessage = getFriendlyErrorMessage(error);
            //     showToaster({ type: "error", message: friendlyMessage });
            // },
            onError: (error) => handleApiError(error, showToaster, router),
            onSuccess: () => {
                showToaster({ type: "success", message: "Image deleted successfully!" });
            }
        });

    // ✅ 6. Handler utama untuk upload file
    const handleUploadFile = (
        files: FileList,
        onChange: (files: FileList | undefined) => void,
        callback: (fileUrl?: string) => void,
        fileUrl?: string
    ) => {
        if (files.length === 0) return;

        const uploadFile = () => {
            const file = files[0];
            const errorMessage = validateImageFile(file);

            if (errorMessage) {
                showToaster({ type: "error", message: errorMessage });
                return;
            }

            onChange(files);
            mutateUploadFile({ file, callback });
        };

        if (fileUrl) {
            mutateDeleteFile({
                fileUrl,
                callback: () => uploadFile(),
            });
        } else {
            uploadFile();
        }
    };

    // ✅ 7. Handler untuk menghapus file
    const handleDeleteFile = (
        fileUrl: string | undefined | FileList,
        callback: () => void
    ) => {
        if (typeof fileUrl === "string") {
            mutateDeleteFile({
                fileUrl,
                // callback: () => onChange(undefined),
                callback,
            });
        } else {
            callback();
        }
    };


    // ✅ 8. Return semua fungsi yang dibutuhkan oleh komponen
    return {
        mutateUploadFile,
        isPendingUploadFile,
        mutateDeleteFile,
        isPendingDeleteFile,
        handleUploadFile,
        handleDeleteFile,
        // handleCancelFile,
    };

};

export default useMediaHandling;

