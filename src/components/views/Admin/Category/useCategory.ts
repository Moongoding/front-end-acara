import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import categoryServices from "@/services/category.Services";
import { useQuery } from "@tanstack/react-query";
import { delay } from "framer-motion";
import { useRouter } from "next/router";
import { ChangeEvent, useMemo } from "react";

const useCategory = () => {
    const debounce = useDebounce();
    const router = useRouter();

    const currentLimit = useMemo(() => {
        const limit = Number(router.query.limit);
        return isNaN(limit) ? LIMIT_DEFAULT : limit;
    }, [router.query.limit]);

    const currentPage = useMemo(() => {
        const page = Number(router.query.page);
        return isNaN(page) ? PAGE_DEFAULT : page;
    }, [router.query.page]);

    const currentSearch = useMemo(() => {
        return typeof router.query.search === "string" ? router.query.search : "";
    }, [router.query.search]);

    const setURL = () => {
        const newQuery = {
            limit: String(currentLimit),
            page: String(currentPage),
            search: currentSearch,
        };

        const isSame = Object.entries(newQuery).every(
            ([key, value]) => router.query[key] === value
        );

        if (!isSame && router.isReady) {
            router.replace({ query: newQuery }, undefined, { shallow: true });
        }
    };

    const getCategories = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`;
        if (currentSearch) {
            params += `&search=${currentSearch}`;
        }
        const res = await categoryServices.getCategories(params);
        const { data } = res;

        return data;
    };

    const {
        data: dataCategory,
        isLoading: isLoadingCategory,
        isRefetching: isRefetchingCategory,
    } = useQuery({
        queryKey: ["Category", currentPage, currentLimit, currentSearch],
        queryFn: () => getCategories(),
        enabled: router.isReady && !!currentPage && !!currentLimit,
    });

    const handleChangePage = (page: number) => {
        router.push({
            query: {
                ...router.query,
                page,
            },
        });
    };


    const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedLimit = e.target.value;
        router.push({
            query: {
                ...router.query,
                limit: selectedLimit,
                page: PAGE_DEFAULT,
            },
        });
    };


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => {
            const search = e.target.value;
            router.push({
                query: {
                    ...router.query,
                    search,
                    page: PAGE_DEFAULT,
                },
            });
        }, DELAY);
    };

    const handleClearSearch = () => {
        router.push({
            query: {
                ...router.query,
                search: "",
                page: PAGE_DEFAULT,
            },
        });
    };

    return {
        setURL,
        currentLimit,
        currentPage,
        currentSearch,
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch
    };
};

export default useCategory