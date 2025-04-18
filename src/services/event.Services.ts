import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";


const eventServices = {
    getEvents: (params?: string) =>
        instance.get(`${endpoint.EVENT}?${params}`),

    // getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),

    // addCategory: (payload: ICategory) =>
    //     instance.post(endpoint.CATEGORY, payload),

    // deleteCategory: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`),
    // updateCategory: (id: string, payload: ICategory) => instance.put(`${endpoint.CATEGORY}/${id}`, payload),
};

export default eventServices;