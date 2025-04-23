
import { ToasterContext } from "@/contexts/ToasterContexts";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import useMediaHandling from "@/hooks/useMediaHandling";
import { handleApiError } from "@/utils/handleApiError";
import { useRouter } from "next/router";
import eventServices from "@/services/event.Services";

const useDeleteEventModal = () => {
    const { showToaster } = useContext(ToasterContext);
    const { mutateDeleteFile } = useMediaHandling();
    const router = useRouter();

    const deleteEvent = async ({ id, bannerUrl }: { id: string, bannerUrl: string }) => {
        await eventServices.deleteEvent(id);
        if (bannerUrl) {
            mutateDeleteFile({
                fileUrl: bannerUrl,
                callback: () => { /* optional */ }
            });
        }
    };

    const {
        mutate: mutateDeleteEvent,
        isPending: isPendingDeleteEvent,
        isSuccess: isSuccessDeleteEvent
    } = useMutation({
        mutationFn: deleteEvent,
        // onError(error) {
        //     const friendlyMessage = getFriendlyErrorMessage(error);
        //     showToaster({ type: "error", message: friendlyMessage });
        // },
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            showToaster({ type: "info", message: "Delete Event Success" });
        },
    });


    return {
        mutateDeleteEvent,
        isPendingDeleteEvent,
        isSuccessDeleteEvent,
    };
};

export default useDeleteEventModal;