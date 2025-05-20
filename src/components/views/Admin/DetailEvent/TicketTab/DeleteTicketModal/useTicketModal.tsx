
import { ToasterContext } from "@/contexts/ToasterContexts";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { handleApiError } from "@/utils/handleApiError";
import { useRouter } from "next/router";
import ticketServices from "@/services/ticket.Services";

const useDeleteTicketModal = () => {
    const { showToaster } = useContext(ToasterContext);
    const router = useRouter();

    const deleteTicket = async (id: string) => {
        const res = await ticketServices.deleteTicket(id);
        return res;
    };


    const {
        mutate: mutateDeleteTicket,
        isPending: isPendingDeleteTicket,
        isSuccess: isSuccessDeleteTicket
    } = useMutation({
        mutationFn: deleteTicket,
        // onError(error) {
        //     const friendlyMessage = getFriendlyErrorMessage(error);
        //     showToaster({ type: "error", message: friendlyMessage });
        // },
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            showToaster({ type: "info", message: "Delete Ticket Success" });
        },
    });

    const deleteTicketByEvent = async (id: string) => {
        const res = await ticketServices.deleteTicketByEvent(id);
        return res;
    }

    const {
        mutate: deleteTicketByevent,
        isPending: isPendingDeleteTicketByEvent,
        isSuccess: isSuccessDeleteTicketByEvent
    } = useMutation({
        mutationFn: deleteTicketByEvent,
        onError: (error) => handleApiError(error, showToaster, router)
    });

    return {
        mutateDeleteTicket,
        isPendingDeleteTicket,
        isSuccessDeleteTicket,

        deleteTicketByevent,
        isPendingDeleteTicketByEvent,
        isSuccessDeleteTicketByEvent
    };
};

export default useDeleteTicketModal;