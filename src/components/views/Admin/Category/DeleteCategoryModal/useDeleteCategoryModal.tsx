
import { ToasterContext } from "@/contexts/ToasterContexts";
import categoryServices from "@/services/category.Services";
import { getFriendlyErrorMessage } from "@/utils/errorMessage";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import useMediaHandling from "@/hooks/useMediaHandling";

const useDeleteCategoryModal = () => {
    const { showToaster } = useContext(ToasterContext);
    const { mutateDeleteFile } = useMediaHandling();

    // const deleteCategory = async (id: string) => {
    //     const res = await categoryServices.deleteCategory(id);
    //     return res
    // };

    const deleteCategory = async ({ id, iconUrl }: { id: string, iconUrl: string }) => {
        await categoryServices.deleteCategory(id);
        if (iconUrl) {
            mutateDeleteFile({
                fileUrl: iconUrl,
                callback: () => { /* optional */ }
            });
        }
    };


    const { mutate: mutateDeleteCategory, isPending: isPendingDeleteCategory, isSuccess: isSuccessDeleteCategory } = useMutation({
        mutationFn: deleteCategory,
        onError(error) {
            const friendlyMessage = getFriendlyErrorMessage(error);
            showToaster({ type: "error", message: friendlyMessage });
        },
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