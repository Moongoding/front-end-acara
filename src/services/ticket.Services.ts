import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ITicket } from "@/types/Ticket";


const ticketServices = {

    getTicketByEventId: (id: string) => instance.get(`${endpoint.TICKET}/${id}/events`),

    addTicket: (payload: ITicket) =>
        instance.post(endpoint.TICKET, payload),

    deleteTicket: (id: string) => instance.delete(`${endpoint.TICKET}/${id}`),

    deleteTicketByEvent: (id: string) => instance.delete(`${endpoint.TICKET}/events/${id}`),

    updateTicket: (id: string, payload: ITicket) => instance.put(`${endpoint.TICKET}/${id}`, payload),
};

export default ticketServices;