import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";


const eventServices = {
    getEvents: (params?: string) =>
        instance.get(`${endpoint.EVENT}?${params}`),

    addEvent: (payload: IEvent) =>
        instance.post(endpoint.EVENT, payload),

    locationByRegency: (name: string) =>
        instance.get(`${endpoint.REGION}-search?name=${name}`),

    deleteEvent: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
    // getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),


    // updateCategory: (id: string, payload: ICategory) => instance.put(`${endpoint.CATEGORY}/${id}`, payload),
};

export default eventServices;