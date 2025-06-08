
import useChangeUrl from "@/hooks/useChangeUrl";
import bannerServices from "@/services/banner.Services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { signOut } from "next-auth/react";

const useBanner = () => {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState<{ _id: string; icon?: string } | null>(null);

    const {
        currentLimit,
        currentPage,
        currentSearch,
    } = useChangeUrl();

    const getBanners = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await bannerServices.getBanners(params);
        const { data } = res;

        if (data.status === 403) {
            // redirect ke login
            await signOut();
            return;
        }

        return data;
    };

    const {
        data: dataBanners,
        isLoading: isLoadingBanners,
        isRefetching: isRefetchingBanners,
        refetch: refetchBanners
    } = useQuery({
        queryKey: ["Banners", currentPage, currentLimit, currentSearch],
        queryFn: () => getBanners(),
        enabled: router.isReady && !!currentPage && !!currentLimit,
    });


    return {
        dataBanners,
        isLoadingBanners,
        isRefetchingBanners,
        refetchBanners,

        selectedId,
        setSelectedId
    };
};

export default useBanner