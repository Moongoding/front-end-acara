import { ToasterContext } from "@/contexts/ToasterContexts";
import bannerServices from "@/services/banner.Services";
import { IBanner } from "@/types/Banner";
import { handleApiError } from "@/utils/handleApiError";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailBanner = () => {
    const router = useRouter();
    const { query, isReady } = useRouter();
    const { showToaster } = useContext(ToasterContext);

    const getBannerById = async (id: string) => {
        const { data } = await bannerServices.getBannerById(id);

        return data.data;
    }

    const { data: dataBanner, refetch: refetchBanner } = useQuery({
        queryKey: ["Banner"],
        queryFn: () => getBannerById(`${query.id}`),
        enabled: isReady,
    });

    const updateBanner = async (payload: IBanner) => {
        const { data } = await bannerServices.updateBanner(`${query.id}`, payload,);
        return data.data;
    }

    const { mutate: mutateUpdateBanner,
        isPending:
        isPendingUpdateBanner,
        isSuccess: isSuccessUpdateBanner
    } = useMutation({
        mutationFn: (payload: IBanner) => updateBanner(payload),
        // onError: (error) => {
        //     const friendlyMessage = getFriendlyErrorMessage(error);
        //     showToaster({ type: "error", message: friendlyMessage });
        // },
        onError: (error) => handleApiError(error, showToaster, router),
        onSuccess: () => {
            refetchBanner();
            showToaster({ type: "success", message: "Success Update Banner" });
        },
    });

    const handleUpdateBanner = (data: IBanner) => mutateUpdateBanner(data);



    return {
        dataBanner,
        handleUpdateBanner,
        isPendingUpdateBanner,
        isSuccessUpdateBanner,
    };
};


export default useDetailBanner;