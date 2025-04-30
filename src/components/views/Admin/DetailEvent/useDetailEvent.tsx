import { ToasterContext } from "@/contexts/ToasterContexts";
import eventServices from "@/services/event.Services";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { getFriendlyErrorMessage } from "@/utils/errorMessage";
import { handleApiError } from "@/utils/handleApiError";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { boolean, number } from "yup";

const useDetailEvent = () => {
    const router = useRouter();
    const { query, isReady } = useRouter();
    const { showToaster } = useContext(ToasterContext);

    const getEventById = async (id: string) => {
        const { data } = await eventServices.getEventById(id);

        return data.data;
    }

    const { data: dataEvent, refetch: refetchEvent } = useQuery({
        queryKey: ["Event"],
        queryFn: () => getEventById(`${query.id}`),
        enabled: isReady,
    });

    const { data: dataRegionById } = useQuery({
        queryKey: ["defaultRegion"],
        queryFn: () => eventServices.getRegencyById(dataEvent?.location?.region),
        enabled: !!dataEvent?.location?.region,
    });


    const updateEvent = async (payload: IEvent) => {
        const { data } = await eventServices.updateEvent(`${query.id}`, payload,);
        return data.data;
    }

    const { mutate: mutateUpdateEvent,
        isPending:
        isPendingUpdateEvent,
        isSuccess: isSuccessUpdateEvent
    } = useMutation({
        mutationFn: (payload: IEvent) => updateEvent(payload),

        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            refetchEvent();
            showToaster({ type: "success", message: "Success Update Event" });
        },
    });

    // const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

    // 📩 Update Handler
    const handleUpdateInfo = (data: IEventForm) => {
        const payload = {
            ...data,
            isFeatured: data.isFeatured === "true" || data.isFeatured === true,
            isPublish: data.isPublish === "true" || data.isPublish === true,
            // isFeatured: Boolean(data.isFeatured),
            // isPublish: Boolean(data.isPublish),
            startDate: data.startDate ? toDateStandard(data.startDate) : "",
            endDate: data.endDate ? toDateStandard(data.endDate) : "",
        };
        console.log("Payload yang dikirim:", payload);
        mutateUpdateEvent(payload);
    };

    // 📩 Update Handler
    const handleUpdateLocation = (data: IEventForm) => {
        const payload = {
            isOnline: Boolean(data.isOnline),
            location: {
                region: `${data.region}`,
                coordinates: [Number(data.latitude), Number(data.longitude)]
            },
            banner: data.banner
        };
        mutateUpdateEvent(payload);
    };


    const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);


    return {
        dataEvent,
        handleUpdateEvent,
        handleUpdateInfo,
        handleUpdateLocation,
        isPendingUpdateEvent,
        isSuccessUpdateEvent,

        dataRegionById,
    };
};


export default useDetailEvent;