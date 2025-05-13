import ticketServices from "@/services/ticket.Services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";


const useTicketTab = () => {
    const { query, isReady } = useRouter();

    const getTicketByEventId = async () => {
        const { data } = await ticketServices.getTicketByEventId(`${query.id}`);

        return data.data;
    }

    const {
        data: dataTicket,
        refetch: refetchTicket,
        isRefetching: isRefetchingTicket,
        isPending: isPendingTicket
    } = useQuery({
        queryKey: ["tickets", query.id],
        queryFn: getTicketByEventId,
        enabled: isReady,
    });

    return {
        dataTicket,
        refetchTicket,
        isRefetchingTicket,
        isPendingTicket
    }
}

export default useTicketTab;