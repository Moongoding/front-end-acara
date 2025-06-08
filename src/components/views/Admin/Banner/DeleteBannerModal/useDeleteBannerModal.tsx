
import { ToasterContext } from "@/contexts/ToasterContexts";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import useMediaHandling from "@/hooks/useMediaHandling";
import { handleApiError } from "@/utils/handleApiError";
import { useRouter } from "next/router";
import bannerServices from "@/services/banner.Services";

const useDeleteBannerModal = () => {
    const { showToaster } = useContext(ToasterContext);
    const { mutateDeleteFile } = useMediaHandling();
    const router = useRouter();

    const deleteBanner = async ({ id, imageUrl }: { id: string, imageUrl: string }) => {
        await bannerServices.deleteBanner(id);
        if (imageUrl) {
            mutateDeleteFile({
                fileUrl: imageUrl,
                callback: () => { /* optional */ }
            });
        }
    };


    const {
        mutate: mutateDeleteBanner,
        isPending: isPendingDeleteBanner,
        isSuccess: isSuccessDeleteBanner
    } = useMutation({
        mutationFn: deleteBanner,
        // onError(error) {
        //     const friendlyMessage = getFriendlyErrorMessage(error);
        //     showToaster({ type: "error", message: friendlyMessage });
        // },
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            showToaster({ type: "info", message: "Delete Banner Success" });
        },
    });

    return {
        mutateDeleteBanner,
        isPendingDeleteBanner,
        isSuccessDeleteBanner,
    };
};

export default useDeleteBannerModal;