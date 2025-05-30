
import { ToasterContext } from "@/contexts/ToasterContexts";
import categoryServices from "@/services/category.Services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import useMediaHandling from "@/hooks/useMediaHandling";
import { handleApiError } from "@/utils/handleApiError";
import { useRouter } from "next/router";

const useDeleteCategoryModal = () => {
    const { showToaster } = useContext(ToasterContext);
    const { mutateDeleteFile } = useMediaHandling();
    const router = useRouter();

    const deleteCategory = async ({ id, iconUrl }: { id: string, iconUrl: string }) => {
        await categoryServices.deleteCategory(id);
        if (iconUrl) {
            mutateDeleteFile({
                fileUrl: iconUrl,
                callback: () => { /* optional */ }
            });
        }
    };


    const {
        mutate: mutateDeleteCategory,
        isPending: isPendingDeleteCategory,
        isSuccess: isSuccessDeleteCategory
    } = useMutation({
        mutationFn: deleteCategory,
        // onError(error) {
        //     const friendlyMessage = getFriendlyErrorMessage(error);
        //     showToaster({ type: "error", message: friendlyMessage });
        // },
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            showToaster({ type: "info", message: "Delete Category Success" });
        },
    });

    return {
        mutateDeleteCategory,
        isPendingDeleteCategory,
        isSuccessDeleteCategory,
    };
};

export default useDeleteCategoryModal;