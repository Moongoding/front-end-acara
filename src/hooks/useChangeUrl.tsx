import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useMemo } from "react";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "./useDebounce";

const useChangeUrl = () => {
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


    const setUrl = () => {
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

    useEffect(() => {
        if (
            router.isReady
            &&
            currentLimit &&
            currentPage &&
            currentSearch !== undefined
        ) {
            setUrl();
        }
    }, [router.isReady, currentLimit, currentPage, currentSearch, setUrl]);


    return {
        setUrl,
        currentLimit,
        currentPage,
        currentSearch,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    };
};

export default useChangeUrl