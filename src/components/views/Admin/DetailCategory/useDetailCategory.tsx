import { ToasterContext } from "@/contexts/ToasterContexts";
import categoryServices from "@/services/category.Services";
import { ICategory } from "@/types/Category";
import { getFriendlyErrorMessage } from "@/utils/errorMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";





const useDetailCategory = () => {
    const { query, isReady } = useRouter();
    const { showToaster } = useContext(ToasterContext);


    const getCategoryById = async (id: string) => {
        const { data } = await categoryServices.getCategoryById(id);

        return data.data;
    }

    const { data: dataCategory, refetch: refetchCategory } = useQuery({
        queryKey: ["Category"],
        queryFn: () => getCategoryById(`${query.id}`),
        enabled: isReady,
    });




    const updateCategory = async (payload: ICategory) => {
        const { data } = await categoryServices.updateCategory(`${query.id}`, payload,);
        return data.data;
    }

    const { mutate: mutateUpdateCategory,
        isPending:
        isPendingUpdateCategory,
        isSuccess: isSuccessUpdateCategory
    } = useMutation({
        mutationFn: (payload: ICategory) => updateCategory(payload),
        onError: (error) => {
            const friendlyMessage = getFriendlyErrorMessage(error);
            showToaster({ type: "error", message: friendlyMessage });
        },
        onSuccess: () => {
            refetchCategory();
            showToaster({ type: "success", message: "Success Update category" });
        },
    });

    const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);



    return {
        dataCategory,
        handleUpdateCategory,
        isPendingUpdateCategory,
        isSuccessUpdateCategory,
    };
};


export default useDetailCategory;